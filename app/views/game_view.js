var View = require('./view');
var ShipView = require('./ship_view');
var EventView = require('./event_view');
var FactionView = require('./faction_view');

module.exports = View.extend({
  id : 'game',

  events: {
    'click a#game-btn': 'toggleGameLoop'
  },

  initialize: function(options){
    this.gameLoopInterval = null;
    this.gameIntervalFunction = null;
    this.count = 0;

    this.worldmap = this.options.worldmap;

    this.gameEvents = this.options.gameEvents;
    this.fleets = this.options.fleets;
    this.ships = this.options.ships;
    this.factions = this.options.factions;

    // holds the faction path that where already rendered
    this.renderedFactions = [];

    // add second is one day in game
    this.intervalTime = (24 * 60 * 60 * 1000); // hours/minutes/seconds/milliseconds
    // one second is one hour in game
    //this.intervalTime = (60 * 60 * 1000); // minutes/seconds/milliseconds

    this.start_date = new Date(1939, 8, 1);
    //this.start_date = new Date(1940, 3, 1);
    this.end_date = new Date(1945, 4, 8);
    this.new_date = new Date(this.start_date.getTime() + (this.count * this.intervalTime));

    this.weekdays = [
      'Sonntag', 
      'Montag', 
      'Dienstag', 
      'Mittwoch', 
      'Donnerstag', 
      'Freitag', 
      'Samstag'
    ];

    this.months = [
      'January', 
      'February', 
      'March', 
      'April', 
      'Mai', 
      'June', 
      'July',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];

    
    _.bindAll(this, 
      'renderSubmarineZones', 
      'renderEvents', 
      'renderFleets', 
      'renderShips', 
      'renderFactions', 
      'displayDate', 
      'gameLoop', 
      'toggleGameLoop', 
      'beforeRender');

    this.displayDate();
  },

  render: function(){

    var $this = this;
    this.gameIntervalFunction = function(){
      $this.gameLoop();
      $this.count++;

      console.log('rendering game loop');
    };

    this.gameLoopInterval = setInterval(this.gameIntervalFunction, 1000);

    return $this.$el;
  },

  // The loop that will be called on every game tick
  gameLoop: function(){
    
    // set the date calculation
    this.new_date = new Date(this.start_date.getTime() + (this.count * this.intervalTime));
    this.displayDate();

    this.renderFleets();
    this.renderEvents();
    this.renderShips();
    this.renderSubmarineZones();
    this.renderFactions();
  },

  displayDate: function(){

    //console.log('render before');


    var newDate = this.new_date.getDate() < 9 ? '0' + this.new_date.getDate() : this.new_date.getDate();
    var newHour = this.new_date.getHours() < 9 ? '0' + this.new_date.getHours() : this.new_date.getHours();
    var newMinute = this.new_date.getMinutes() < 9 ? '0' + this.new_date.getMinutes() : this.new_date.getMinutes();

    $('#weekday').text( 
      this.weekdays[this.new_date.getDay()]
      + ' - '
      + newDate + '. '
      + this.months[this.new_date.getMonth()] + ' '
      + this.new_date.getFullYear()
      + ' '
      + newHour + ':'
      + newMinute + ' Uhr'
    );
  },

  beforeRender: function(){
    this.displayDate();
  },

  afterRender: function(){

  },

  // check if there is any event that should be triggered at current date
  renderEvents: function(){
    //console.log(this.gameEvents);
    var $this = this;

    //TODO if event is type major the game will be paused on default
    var gameTime = $this.new_date.getTime();

    _.each(this.gameEvents.models, function(gameEvent, idx){
      var eventDate = gameEvent.get('date');
      var date = eventDate.split('-');
      var dateObj = new Date(date[0], date[1]-1, date[2]);

      if($this.dayDifference(dateObj, $this.new_date) == 0){

        // trigger new event and show the overlay screen
          var eventView = new EventView({gameEvent: gameEvent, worldmap: $this.worldmap}); 
              $('#events-list').append(eventView.render().el);   
      }

    });

  },

  renderFleets: function(){

    //console.log(this.fleets.models);
    _.each(this.fleets.models, function(fleet, idx){
      var fleetPosition = fleet.get('positions');

      var positionDate = fleetPosition

    });
  },

  renderShips: function(){
    var $this = this;

    var gameTime = $this.new_date.getTime();

     _.each(this.ships.models, function(ship, idx){
      var shipSunkDate = ship.get('sunk_date');
      var date = shipSunkDate.split('-');
      var dateObj = new Date(date[0], date[1]-1, date[2]);

      /*"date": "1939-12-17",*/      
      // render new sunken ship if it doesn't exist already
      
      if($this.dayDifference(dateObj, $this.new_date) == 0){

        var shipView = new ShipView({
              ship: ship,
              worldmap: $this.worldmap
            }); 

            shipView.render();
            shipView.initialize();

        // add element to the dom as html
        var $li = $('<li id="ship-'+ ship.get('id') +'"></li>');

        $li.append( '<span class="ship-date">'+ ship.get('sunk_date') +'</span>' );
        $li.append( '<span class="ship-country">'+ ship.get('country') +'</span>' );
        $li.append( '<span class="ship-report">'+ ship.get('sunk_report') +'</span>' );

        $('#ship-list').append( $li );
      }

      
    });
  },

  renderSubmarineZones: function(){
    var $this = this; 

    var gameTime = $this.new_date.getTime();

    _.each($this.worldmap.submarineZonesPaths, function(zone, idx){
      var startDate = zone[1].split('-');
      var startDateObj = new Date(startDate[0], startDate[1]-1, startDate[2]);

      var endDate = zone[2].split('-');
      var endDateObj = new Date(endDate[0], endDate[1]-1, endDate[2]);

      //console.log($this.dayDifference(startDateObj, $this.new_date));

      // activate if date is reached
      if($this.dayDifference(startDateObj, $this.new_date) <= 0){
        d3.select(zone[0].node())
          .classed('inactive', false);
      }

      // deactivate if end date is reached
      if($this.dayDifference(endDateObj, $this.new_date) <= 0){
        d3.select(zone[0].node())
          .classed('inactive', true);
      }

    });
  },

  renderFactions: function(){
    var $this = this; 
 
    var gameTime = $this.new_date.getTime();

    _.each($this.factions.models, function(factionPath, idx){

      var startDate = factionPath.get('start_date').split('-');
      var startDateObj = new Date(startDate[1], startDate[2]-1, startDate[3]);

      var endDate = factionPath.get('end_date').split('-');
      var endDateObj = new Date(endDate[1], endDate[2]-1, endDate[3]);


      // activate if date is reached
      if($this.dayDifference(startDateObj, $this.new_date) <= 0){

        if( $this.renderedFactions.indexOf( factionPath.get('id') ) == -1) {

          var factionView = new FactionView({factionPath: factionPath}); 
              factionView.render();
              factionView.initialize();

          $this.renderedFactions.push( factionPath.get('id') );
        }
      }

      if($this.dayDifference(endDateObj, $this.new_date) <= 0){
        d3.select( '#faction-path-' + factionPath.get('id') ).remove();
      }
    });
  },

  showScreen: function(){

  },

  toggleGameLoop: function(e){
    console.log('pause clicked');
    e.preventDefault();

    if($(this).hasClass('paused')){
      $(this).removeClass('paused');
    }else{
      $(this).addClass('paused');
    }
  },

  dayDifference: function(startDate, endDate) {
    return Math.round((startDate - endDate) / (1000*60*60*24));
  }

});
