var View = require('./view');
var SunkenShipView = require('./sunken_ship_view');
var EventView = require('./event_view');

module.exports = View.extend({
  id : 'game',

  events: {
    'click a#game-btn': 'toggleGameLoop'
  },

  initialize: function(options){
    this.gameLoopInterval = '';
    this.count = 0;

    this.worldmap = this.options.worldmap;

    this.gameEvents = this.options.gameEvents;
    this.fleets = this.options.fleets;
    this.sunkenShips = this.options.sunkenShips;

    console.log('options', this.options);

    // add second is one day in game
    this.intervalTime = (24 * 60 * 60 * 1000); // hours/minutes/seconds/milliseconds
    // one second is one hour in game
    //this.intervalTime = (60 * 60 * 1000); // minutes/seconds/milliseconds

    this.start_date = new Date(1939, 8, 1);
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

    
    _.bindAll(this, 'renderEvents', 'renderFleets', 'renderSunkenShips', 'displayDate', 'gameLoop', 'toggleGameLoop', 'beforeRender');
    this.displayDate();
  },

  render: function(){

    var $this = this;
    this.gameLoopInterval = setInterval(function(){
      $this.gameLoop();
      $this.count++;
      //console.log($this.count);
    }, 1000);

    return $this.$el;

  },

  // The loop that will be called on every game tick
  gameLoop: function(){
    
    // set the date calculation
    this.new_date = new Date(this.start_date.getTime() + (this.count * this.intervalTime));
    this.displayDate();

    this.renderFleets();
    this.renderEvents();
    this.renderSunkenShips();

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

  renderSunkenShips: function(){
    var $this = this;

    var gameTime = $this.new_date.getTime();

     _.each(this.sunkenShips.models, function(ship, idx){
      var shipSunkDate = ship.get('date');
      var date = shipSunkDate.split('-');
      var dateObj = new Date(date[0], date[1]-1, date[2]);

      /*"date": "1939-12-17",*/      
      // render new sunken ship if it doesn't exist already
      
      if($this.dayDifference(dateObj, $this.new_date) == 0){

        var sunkenShipView = new SunkenShipView({ship: ship}); 
            sunkenShipView.render();
            sunkenShipView.initialize();
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
      return (startDate - endDate) / (1000*60*60*24);
  }

});
