(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("lib/utils", function(exports, require, module) {
  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }
});
window.require.register("application", function(exports, require, module) {
  // Application bootstrapper.
  Application = {
    initialize: function() {
      var HomeView = require('views/home_view');
      var Router = require('lib/router');

      // Ideally, initialized classes should be kept in controllers & mediator.
      // If you're making big webapp, here's more sophisticated skeleton
      // https://github.com/paulmillr/brunch-with-chaplin
      this.homeView = new HomeView();
      this.router = new Router();

      if (typeof Object.freeze === 'function') Object.freeze(this);
    }
  }

  module.exports = Application;
  
});
window.require.register("initialize", function(exports, require, module) {
  var application = require('application');

  $(function() {
    application.initialize();
    Backbone.history.start();
  });
  
});
window.require.register("lib/router", function(exports, require, module) {
  var application = require('application');

  // models
  var Countries = require('models/countries');
  var Provinces = require('models/provinces');
  var Borders = require('models/borders');
  var Locations = require('models/locations');
  var Events = require('models/events');
  var Fleets = require('models/fleets');
  var SunkenShips = require('models/sunken_ships');
  var Game = require('views/game_view');

  // views
  var Worldmap = require('views/worldmap_view');
  var Interface = require('views/interface_view');
  var Dialog = require('views/dialog_view');

  module.exports = Backbone.Router.extend({
    routes: {
      '': 'home',
      '/': 'home',
      'worldmap': 'worldmap'
    },

    // render the home page
    home: function() {
      $('body').html(application.homeView.render().el);
    },

    // render the worldmap and start the simulation
    worldmap: function() {
    	$('body').empty();

      // add fix for the html body
      $('body').css({'overflow': 'hidden'});

      var countries = new Countries();

      $.when(countries.fetch()).done(function(){

        //var worldmap = new Worldmap({ countries: countries });
        //$('body').html(worldmap.render().el);
      });
     
    	// load all provinces from file
      var provinces = new Provinces();
      var borders = new Borders();
      var locations = new Locations();
      var fleets = new Fleets();
      var gameEvents = new Events();
      var sunkenShips = new SunkenShips();

      $.when(
        
        provinces.fetch(),
        borders.fetch(),
        locations.fetch(),
        fleets.fetch(),
        gameEvents.fetch(),
        sunkenShips.fetch()

        ).done(function(){

        var worldmap = new Worldmap({ 
          provinces: provinces, 
          borders: borders, 
          locations: locations,
          fleets: fleets
        });
      
        $('body').append(worldmap.render().el);

        // initialize the game class
        var game = new Game({ 
          worldmap: worldmap,
          gameEvents: gameEvents,
          fleets: fleets,
          sunkenShips: sunkenShips
        });

        game.beforeRender();

        var _interface = new Interface({ game: game, worldmap: worldmap });
        $('body').append(_interface.render().el); 
          
        var dialog = new Dialog({
          game: game,
          headline: 'Welcome', 
          description: 'You are in command of our glorious fleet. It\'s your task to command our chips and submarines to strike out Britain from war', 
          submit: 'Start Game'
        });

        $('body').append(dialog.render().el);

      });
      
    }

  });
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
});
window.require.register("models/app_interface", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/border", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	defaults: {
  
  		id: null,
  		name: ''
  
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/borders", function(exports, require, module) {
  var Border = require('./border');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Border,
    url: './js/data/borders.json',
  
    initialize: function() {
      console.log('Borders loaded!');
    }
  });
});
window.require.register("models/collection", function(exports, require, module) {
  // Base class for all collections.
  module.exports = Backbone.Collection.extend({
  	
  });
  
});
window.require.register("models/countries", function(exports, require, module) {
  var Country = require('./country');
  var Worldmap = require('./worldmap');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Country,
    url: './js/data/countries.json',
  
    parse: function(data){
    	return data.shapes;
    },
  
    initialize: function() {
      console.log('Countries loaded!');
    }
  });
});
window.require.register("models/country", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/event", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	defaults: {
  
  		id: null,
  		date: '',
  		name: '',
  		description: '',
  		type: 'major',
  		x: 0,
  		y: 0
  
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/events", function(exports, require, module) {
  var Event = require('./event');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Event,
    url: './js/data/events.json',
  
    initialize: function() {
      console.log('Events loaded!');
    }
  });
});
window.require.register("models/fleet", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	defaults: {
  
  		id: null,
  		name: ''
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/fleets", function(exports, require, module) {
  var Fleet = require('./fleet');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Fleet,
    url: './js/data/fleets.json',
  
    initialize: function() {
      console.log('Fleets loaded!');
    }
  });
});
window.require.register("models/game", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	timeInterval: null,
  
  	months: [
  		'january', 
  		'february', 
  		'march', 
  		'april', 
  		'may', 
  		'june', 
  		'july', 
  		'august', 
  		'september', 
  		'october', 
  		'november', 
  		'december'
  	],
  
  	weekdays: [
  		'monday', 
  		'tuesday', 
  		'wednesday', 
  		'thursday', 
  		'friday', 
  		'saturday', 
  		'sunday'
  	],
  
  	defaults: {
  		id: null,
  		
  		// one hour in game is 1 seconds in real time
  		speed: 1000,
  		startDate: '01-09-1939',
  
  		hour: 0,
  		day: 1,
  		month: 6,
  		year: 1940,
  		
  		startHour: 0,
  		startDay: 1,
  		startMonth: 7,
  		startYear: 1940,
  		
  		month_days: 30,
  
  		processedMilliseconds: 0,
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  
  		_.bindAll(this, 'calculateTime');
  	},
  
  	startGame: function(){
  		var $this = this;
  
  		var i=0;
  
  		this.timeInterval = setInterval(function(){
  			console.log(i);
  			console.log($this.defaults.hour);
  
  			$this.calculateTime();
  			$this.processedMilliseconds += 1000;
  
  			i++;
  		}, $this.defaults.speed);
  
  	},
  
  	pauseGame: function(){
  
  	},
  
  	calculateTime : function() {
  		if(this.defaults.month == 11)
  		{
  			this.defaults.month = 0;
  			this.defaults.year++;
  		}
  		if(this.defaults.day == this.month_days)
  		{
  			this.defaults.day = 1;
  			this.defaults.month++;
  		}
  		if(this.defaults.hour == 23)
  		{
  			this.defaults.hour = 0;
  			this.defaults.day++;
  		}
  
  		this.defaults.hour++;
  		
  		var weekday = this.defaults.day % 7;
  		$('#weekday').text(this.weekdays[weekday]);
  
  		if(this.defaults.day <= 9)
  			$('#day').text('0' + this.defaults.day + '.');
  		else
  			$('#day').text(this.defaults.day + '.');
  		
  
  		$('#month').text(this.months[this.defaults.month]);
  		$('#year').text(this.defaults.year);
  		$('#time').text(this.defaults.hour + ':00 Uhr');
  	}
  });
});
window.require.register("models/location", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	defaults: {
  
  		id: null,
  		name: '',
  		type: 'city',
  		x: 0,
  		y: 0
  
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/locations", function(exports, require, module) {
  var Location = require('./location');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Location,
    url: './js/data/locations.json',
  
    initialize: function() {
      console.log('Locations loaded!');
    }
  });
});
window.require.register("models/model", function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
    initialize: function(values){
      Backbone.Model.prototype.initialize.call(this, values);
    },

    // Generates a JSON representation of this model
    toJSON: function(){
      var data = Backbone.Model.prototype.toJSON.call(this);
      return data;
    },
  });
  
});
window.require.register("models/province", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	defaults: {
  
  		id: null,
  		name: ''
  
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/provinces", function(exports, require, module) {
  var Province = require('./province');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Province,
    url: './js/data/provinces.json',
  
    initialize: function() {
      console.log('Provinces loaded!');
    }
  });
});
window.require.register("models/sunken_ship", function(exports, require, module) {
  var Model = require('./model');
  
  module.exports = Model.extend({
  	
  	defaults: {
  
  		id: null,
  		name: ''
  
  	},
  
  	intitialize : function(values){
  		Model.prototype.initialize.call(this, values);
  	}
  
  });
});
window.require.register("models/sunken_ships", function(exports, require, module) {
  var SunkenShip = require('./sunken_ship');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: SunkenShip,
    url: './js/data/sunken_ships.json',
  
    initialize: function() {
      console.log('Sunken Ships loaded!');
    }
  });
});
window.require.register("models/units", function(exports, require, module) {
  module.exports = Backbone.Model.extend({
   
  });
});
window.require.register("models/worldmap", function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
  });
  
});
window.require.register("views/context_view", function(exports, require, module) {
  var View = require('./view');
  var StatisticsView = require('./statistics_view');
  
  module.exports = View.extend({
    id: 'context-view',
    template: require('./templates/context'),
  
   	events: {
      'click .close-btn': 'close'
    },
  
    initialize: function(options){
  		this.context = this.options.context;
  		this.worldmap = this.options.worldmap;
  
  		console.log('Context view loaded');
  
  		this.setContext();
  
  		_.bindAll(this, 'setContext', 'render', 'afterRender', 'close');
  	},
  
  	render: function(){
  		
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
  
  		return this;
  	},
  
  	afterRender: function(){
  
  	},
  
  	setContext: function(){
  
  		switch(this.context){
  			case 'statistics':
  
  				var statisticsView = new StatisticsView();
  						this.$('#context-content').empty().append(statisticsView.render().el);
  			break;
  		}
  	},
  
  	close: function(event){
  		var $this = this;
  	
  		$this.$el.fadeOut(250, function(){
  			$this.destroy();
  		});
  	}
  
  });
  
});
window.require.register("views/dialog_view", function(exports, require, module) {
  var View = require('./view');
  var Game = require('./game_view');
  
  module.exports = View.extend({
    className : 'dialog',
    template: require('./templates/dialog'),
  
   	events: {
      'click .submit-btn': 'submitDialog',
      'click .save-btn': 'saveDialog',
      'click .cancel-btn': 'cancelDialog',
      'click .close-dialog-btn': 'closeDialog'
    },
  
    initialize: function(options){
  		this.direction = this.options.direction;
  
  		this.headline = this.options.headline;
  		this.description = this.options.description;
  
  		this.buttons = {
  			submit: this.options.submit,
  			save: this.options.save,
  			cancel: this.options.cancel
  		};
  
  		this.dialogOptions = [];
  
  		this.game = this.options.game;
  		// remove existing dialog from screen
  		//$('body .dialog').remove();
  	},
  
  	getRenderData: function() {
      return {
      	headline: this.headline,
      	description: this.description,
      	buttons: this.buttons
      };
    },
  
  	submitDialog: function(event){
  		event.preventDefault();
  
  		if($(event.target).attr('rel') == 'start-game'){
  			console.log('starting the game loop');
  			this.game.render();
  		}
  
  		this.destroy();
  	},
  
  	saveDialog: function(event){
  		console.log('save dialog');
  		event.preventDefault();
  	},
  
  	cancelDialog: function(event){
  		console.log('cancel dialog');
  		event.preventDefault();
  	},
  
  	closeDialog: function(event){
  		console.log('closing dialog');
  		this.destroy();
  	}
  
  });
  
});
window.require.register("views/event_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: '',
    template: require('./templates/event'),
  
   	events: {
      'click .close-btn': 'closeEvent',
      'click .show-on-map-btn': 'showOnMap'
    },
  
    initialize: function(options){
  		this.model = this.options.gameEvent;
  		this.worldmap = this.options.worldmap;
  
  		console.log('Event view loaded');
  
  		/*
  		this.date = this.model.attributes.date;
  		this.date = this.date.split('-');
  
  		this.date = new Date(
  			this.date[0],
  			this.date[1]-1,
  			this.date[2]
  		);
  
  		this.model.attributes.date = this.date.getDate();
  		*/
  
  		_.bindAll(this, 'render', 'afterRender', 'closeEvent', 'showOnMap');
  	},
  
  	render: function(){
  		
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
  
  		return this;
  	},
  
  	afterRender: function(){
  		var $this = this;
  
  		// add event listener by jQuery due to backbone issue
  		_.defer(function(){
  
  			$('.show-on-map-btn').on('click', function(e){
  				var x = $(this).attr('x');
  				var y = $(this).attr('y');
  
  				$this.worldmap.moveTo(x, y); 
  			});
  
  
  		});
  	},
  
  	closeEvent: function(event){
  		var $this = this;
  		console.log('closing event');
  
  		$this.$el.fadeOut(250, function(){
  			$this.destroy();
  		});
  	},
  
  	showOnMap: function(event){
  		console.log('moving map');
  	}
  
  });
  
});
window.require.register("views/fleet_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id : '',
    className: 'fleet',
  
    //template: require('./templates/interface'),
  
    events: {
      'click .fleet': 'showFleetInfo',
    },
  
    initialize: function(options){
  
      _.bindAll(this, 'calculateEvents', 'calculateFleets', 'displayDate', 'gameLoop');
    },
  
    render: function(){
  
      return $this.$el;
  
    },
  
    showFleetInfo: function(){
  
    }
  });
  
});
window.require.register("views/game_view", function(exports, require, module) {
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
  
});
window.require.register("views/home_view", function(exports, require, module) {
  var View = require('./view');

  module.exports = View.extend({
    id: 'page',
    template: require('./templates/home'),

    initialize: function(){
  		
  	},

    getRenderData: function(){
  		return { name: 'hello' };
    }
  });
  
});
window.require.register("views/interface_view", function(exports, require, module) {
  var View = require('./view');
  var ContextView = require('./context_view');
  
  module.exports = View.extend({
    id : '',
    template: require('./templates/interface'),
  
  	events: {
  		'click #close-btn': 'closeProvinceView',
  		'click a.ship-link': 'openShipDialog',
  		'click #mainmenu li': 'showScreen',
  
  		'click #filter-list li a': 'filterMap',
    },
  
    initialize: function(options){
  		this.game = this.options.game;
  		this.worldmap = this.options.worldmap;
  
  		_.bindAll(this, 'showScreen');
  
  		/*
  		this.ship_types = [
  			'CV': 'Aircraft Carrier',
  			'CVL': 'Light Aircraft Carrier'
  		];
  		*/
  	},
  
  	openShipDialog: function(event){
  		event.preventDefault();
  		console.log(event);
  	},
  
  	closeProvinceView: function(){
  		this.destroy();
  	},
  
  	// open up a screen for the current context
  	showScreen: function(e){
  
  		var context = $(e.target).attr('id');
  
  		// move camera to point
  		if(context == 'goto'){
  			
  			this.worldmap.moveTo(-3500, -1700);
  		}else{
  
  			contextView = new ContextView({context: context});
  			$('body').append(contextView.render().el);
  		}
  	},
  
  	// toggle the filter
  	filterMap: function(e){
  		e.preventDefault();
  
  		var filterItem = $(e.target).parent();
  		var filter = filterItem.attr('id');
  
  		switch(filter){
  			case 'filter-borders':
  				console.log(filter, 'hiding borders');
  				d3.selectAll('.borders').classed('hidden');
  				break;
  
  
  			case 'filter-event':
  
  				var path_old = d3.select('#path2');
  				var path_new = d3.select('#path5').attr('d');
  
  				//console.log(path);
  
  				path_old.transition().duration(5000).attr('d', path_new);
  
  				break;
  		}
  		
  	}
  
  });
  
});
window.require.register("views/province_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    className : 'province',
    template: require('./templates/province'),
  
   	events: {
      'click #close-btn': 'closeProvinceView',
      'click a.ship-link': 'openShipDialog'
    },
  
    initialize: function(options){
  		this.provinceID = this.options.provinceID;
  
  		$('body .province').remove();
  
  		console.log('opening province:', this.provinceID);
  	},
  
  	render: function(){
  		var $this = this;
  
  		var province = _PROVINCES[this.provinceID];
  		var province_fleets = new Array();
  
  		// add fleets to the province
  		_.each(_FLEETS, function(fleet){
  			if(fleet.province == $this.provinceID)
  				province_fleets.push(fleet);
  		});
  
  		province.fleets = province_fleets;
  
  		console.log(province);
  		console.log(province_fleets);
  
  
  		this.$el.html(this.template(province));
  		$('body').append(this.$el);
  
  		return this.$el;
  	},
  
  	openShipDialog: function(event){
  		event.preventDefault();
  		console.log(event);
  	},
  
  	closeProvinceView: function(){
  		this.destroy();
  	}
  
  });
  
});
window.require.register("views/statistics_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: 'statistics',
    template: require('./templates/statistics'),
  
   	events: {
      'click #statistics-menu li': 'switchStatistic'
    },
  
    initialize: function(options){
  		//this.worldmap = this.options.worldmap;
  
  		_.bindAll(this, 'render', 'afterRender', 'switchStatistic');
  	},
  
  	render: function(){
  		
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
  
  		return this;
  	},
  
  	afterRender: function(){
  		var $this = this;
  
  		// add event listener by jQuery due to backbone issue
  		_.defer(function(){
  
  			$('.show-on-map-btn').on('click', function(e){
  				var x = $(this).attr('x');
  				var y = $(this).attr('y');
  
  				$this.worldmap.moveTo(x, y); 
  			});
  		});
  	},
  
  	// render the D3 graph plot
  	switchStatistic: function(event){
  		var currentStatistic = $(event.target).attr('id');
  		
  	}
  
  });
  
});
window.require.register("views/sunken_ship_view", function(exports, require, module) {
  var View = require('./view');
  var TooltipView = require('./tooltip_view');
  
  module.exports = View.extend({
    className : 'sunken-ship',
    template: require('./templates/sunken_ship'),
  
   	events: {
      'mouseenter': 'showInfo',
      'click circle.sunken-ship': 'showInfo'
    },
  
    initialize: function(options){
  		this.model = this.options.ship;
  
  		_.bindAll(this, 'showInfo', 'hideInfo');
  	},
  
  	render: function(){
  		var $this = this;
  	
  		// append the description text to the body as html
  		d3.select('.plot').append('circle')
  			.on('mouseover', $this.showInfo)
        .on('mouseout', $this.hideInfo)
  			.style('opacity', 0)
  			.transition()
  			.duration(1500)
  			.style('opacity', 1.0)
        .attr('r', 2)
        .attr('cx', $this.model.get('x'))
        .attr('cy', $this.model.get('y'))
        .attr('class', function(){
        	return 'sunken-ship ' + $this.model.get('country');
        })
        .attr('title', $this.model.get('name'))
        .attr('rel', $this.model.get('id'));
  
  
       d3.select('.plot').append('circle')
       	.attr('class', 'explosion')
       	.attr('r', 1)
       	.attr('cx', $this.model.get('x'))
       	.attr('cy', $this.model.get('y'))
       	.transition()
       	.duration(600)
       	.attr('r', 32)
       	.style('opacity', 0.0)
       	.remove();	 
  			
  		// add sunken ship report to the list
  		$('#sunk-reports').append($this.template);      
  	},
  
  	showInfo: function(){
  		console.log('showing info');
  		var $this = this;
  
  		var tooltip = new TooltipView({ data: $this.model, SVGObject: $this });
  				tooltip.render();
  	},
  
  	hideInfo: function(){
  		console.log('hiding info');
  	}
  
  
  });
  
});
window.require.register("views/templates/context", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<h2 id="context-headline"></h2>\n<span class="close-btn"> &times;</span>\n\n<div id="context-content">\n\t<span id="loading">Loading ...</span>\n</div>\n\n<div id="context-footer"></div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/dialog", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div class="dialog-header">\n\t<span class="close-dialog-btn">&times;</span>\n</div>\n\n<div class="dialog-content">\n\t<h2>');
      
        __out.push(__sanitize(this.headline));
      
        __out.push('</h2>\n\t<p>');
      
        __out.push(__sanitize(this.description));
      
        __out.push('</p>\n</div>\n\n<div class="dialog-form"></div>\n<div class="dialog-footer">\n\t');
      
        if (this.buttons.submit) {
          __out.push('\n\t\t<span class="form-btn submit-btn" rel="start-game">');
          __out.push(__sanitize(this.buttons.submit));
          __out.push('</span>\n\t');
        }
      
        __out.push('\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/event", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<li class="event" id="');
      
        __out.push(__sanitize(this.id));
      
        __out.push('">\n\t<span class="close-btn"> &times;</span>\n\n\t<span class="event-title">');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</span>\n\t<span class="event-date">');
      
        __out.push(__sanitize(this.date));
      
        __out.push('</span>\n\t<span class="event-description">');
      
        __out.push(__sanitize(this.description));
      
        __out.push('</span>\n\n\t<div class="event-footer">\n\t\t');
      
        if (this.x && this.y) {
          __out.push('\n\t\t\t<span class="show-on-map-btn" x="');
          __out.push(__sanitize(this.x));
          __out.push('" y="');
          __out.push(__sanitize(this.y));
          __out.push('">Show on Map</span>\n\t\t');
        }
      
        __out.push('\n\t</div>\n</li>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div id="home">\n\t<div id="content">\n  \t<h1>Die Atlantikschlacht</h1>\n\n\t  <ul id="home-list">\n\t  \t<li class="column">\n\t  \t\t<p>\n\t  \t\t\tMit Ausbruch des Zweiten Weltkrieges in Europa am 01. September 1939 begann zugleich die längste und vielleicht \n\t  \t\t\tauch wichtigste Schlacht des Krieges - die Atlantikschlacht.\n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\tDie Deutsche Kriegsmarine versuchte dabei die Britische Handelsschifffahrt durch Angriffe von Über- und Unterwasserschiffen \n\t  \t\t\tzu beeinträchtigen. Das Ziel bestand darin Großbritannien durch eine Seeblockade von allen Seewegen und Importen abzuschneiden, \n\t  \t\t\tum so das Land zur Kapitulation zu zwingen. \n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\tDa Großbritanniens Wirtschaft und Rüstung stark abhängig von Importen war, musste gewährleistet werden, dass die Schifffahrtswege\n\t  \t\t\tgeschützt werden. Schiffe die den Atlantik in Richtung der Britischen Inseln ansteuerten, wurden in Konvois zusammengefasst und von Kriegsschiffen eskortiert. Im Verlauf des Krieges stieg die Zahl der eingesetzten Kriegsschiffe kontinuierlich an.\n\t  \t\t</p>\n\t  \t</li>\n\t  \t<li class="column">\n\t  \t\t<p>\n\t  \t\t\tDie Besetzung Norwegens und Fankreichs im Frühjahr 1940 ermöglichte es der Deutschen Kriegsmarine ihre Schiffe \n\t  \t\t\tund U-Boote außerhalb Deutschlands zu stationieren, um einen besseren Zugang zum Atlantik zu erlangen. Großbritannien war während dieser Zeit gezwungen sich gegen die Achsenmächte in Europa allein zu verteidigen.\n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\t<img src="img/photos/the-battle-of-the-north-atlantic-allied-convo-L-QZQh3B.jpeg" title="Photo " />\n\t  \t\t</p>\n\t  \t</li>\n\t  \t<li class="column">\n\t  \t\t<p>\n\t  \t\t\tMit dem Kriegseintritt der USA änderte sich die startegische Situation in der Atlantikschlacht erheblich.\n\t  \t\t\tNun konnten die Alliierten das nahezu unerschöpfliche Rüstungspotential der USA ausnutzen. Die Devise hieß Mehr Schiffe zu bauen, als der Gegner versenken kann. Gleichzeitig wurde durch die Einführung neuer Technologien, wie dem Sonar und das Radar sowie Fortschritte in der Entschlüsselung der Deutschen Kommunikationsstruktur die Deutsche U-Bootflotte zunehmend in die defensive gedrängt.\n\n\t  \t\t\tMan erwartete eine erneute Wende der Schlacht durch den Einsatz neuer U-Boottypen.\n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\tDas Ende des Zweiten Weltkrieges in Europa war auch das Ende der Atlantkischlacht, \n\t  \t\t\tInsgesamt forderte die Schlacht zur See mehr als 90.000 Menschenleben <span class="text-small">(Quelle. <a href="http://en.wikipedia.org/wiki/Battle_of_the_Atlantic" target="_blank">Wikipedia</a>)</small>.\n\t  \t\t</p>\n\t  \t</li>\n\t  </ul>\n\n\t  <ul id="navigation">\n\t  \t<li><a class="btn" id="home-list-prev-btn" href="#">&laquo; zurück</a></li>\n\t  \t<li><a class="btn start-btn" href="#worldmap"> Los geht\'s</a></li>\n\t  \t<li><a class="btn" id="home-list-next-btn" href="#">weiterlesen &raquo;</a></li>\n\t  </ul>\n\n\t</div>\n</div>\n\n<footer id="footer"> \n\t<ul id="footer-menu">\n\t\t<li id="home"><a href="/">Home</a></li>\n\t\t<li id="impressum"><a href="#imprint">Impressum</a></li>\n\t\t<li id="project"><a href="#project">Projekt</a></li>\n\t\t<li id="feedback"><a href="#feedback">Feedback</a></li>\n\t</ul>\n</footer>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/interface", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div id="interface">\n\t<div id="header">\n\t\t<div id="game-time">\n\t\t\t<a id="game-btn" href="#"></a>\n\t\t\t<span id="weekday"></span>\n\t\t</div>\n\t\t<div id="mainmenu-container">\n\t\t\t<ul id="mainmenu">\n\t\t\t\t<li id="goto" title="Go to Position">G</li>\n\t\t\t\t<li id="goto-with-zoom" title="Go to Position with zoom">G</li>\n\t\t\t\t<li id="map" title="Show Map">M</li>\n\t\t\t\t<li id="production" title="Production">P</li>\n\t\t\t\t<li id="units" title="Units">U</li>\n\t\t\t\t<li id="events" title="Event History">E</li>\n\t\t\t\t<li id="statistics" title="Statistics">S</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</div>\n\n\n<div id="map-details"></div>\n\n<ul id="map-modes"></ul>\n<div id="minimap"></div>\n</div>\n\n<div id="filter-container">\n\t<ul id="filter-list">\n\t\t<li id="filter-borders">\n\t\t\t<a href="#" title="Toggle Borders"></a>\n\t\t</li>\n\t\t<li id="filter-convoys">\n\t\t\t<a href="#" title="Show/Hide Convoy Routes"></a>\n\t\t</li>\n\t\t<li id="filter-event">\n\t\t\t<a href="#" title="Call Event (Border)"></a>\n\t\t</li>\n\t\t<li id="filter-diplomacy">\n\t\t\t<a href="#" title="Diplomatic map view"></a>\n\t\t</li>\n\t\t<li id="filter-labels">\n\t\t\t<a href="#" title="Show/Hide labels"></a>\n\t\t</li>\n\t</ul>\n</div>\n\n<ul id="sunk-reports"></ul>\n<ul id="events-list"></ul>\n\n\n\n');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/province", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var fleet, ship, _i, _j, _len, _len1, _ref, _ref1;
      
        __out.push('<table>\n\t<tr>\n\t\t<td>Province Name: </td>\n\t\t<td>\n\t\t\t<span class="name"> ');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</span>\n\t\t</td>\n\t</tr>\n\t<tr>\n\t\t<td>Harbor size: </td>\n\t\t<td>\n\t\t\t<span class="name"> ');
      
        __out.push(__sanitize(this.harbor.level));
      
        __out.push('</span>\n\t\t</td>\n\t</tr>\n</table>\n\n<p>Fleets:</p>\n<ul id="fleets">\n\t');
      
        _ref = this.fleets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fleet = _ref[_i];
          __out.push('\n\t\t<li>\t\n\t\t\t');
          __out.push(__sanitize(fleet.name));
          __out.push('\n\t\t\t\t\n\t\t\t\t<ul class="fleet-ships-list">\n\t\t\t\t\t');
          _ref1 = fleet.ships;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ship = _ref1[_j];
            __out.push('\n\t\t\t\t\t\t<li><a class="ship-link" href="">');
            __out.push(__sanitize(ship.name));
            __out.push('</a></li>\n\t\t\t\t\t');
          }
          __out.push('\n\t\t\t\t</ul>\n\n\t\t</li>\n\t');
        }
      
        __out.push('\n</ul>\n\n<span id="close-btn"> &times; </span>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/statistics", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div id="content-left">\n\t<ul id="statistics-menu">\n\t\t<li id="sunken-ships">Show Sunken Ships</li>\n\t\t<li id="ships-comparison">Ships Comparison</li>\n\t\t<li id="ship-production">Ships Production</li>\n\t</ul>\n</div>\n\n<div id="content-right">\n\t<div id="graph-plot"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/sunken_ship", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<li id="');
      
        __out.push(__sanitize(this.id));
      
        __out.push('">\n\t<span class="sunken-ship-title">');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</span>\n\t<span class="sunken-ship-date">');
      
        __out.push(__sanitize(this.date));
      
        __out.push('</span>\n\t<span class="sunken-ship-description">');
      
        __out.push(__sanitize(this.description));
      
        __out.push('</span>\n</li>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/tooltip", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        __out.push('<div id="tooltip">\n\t');
      
        __out.push(__sanitize(this.description));
      
        __out.push('\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/worldmap", function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/tooltip_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    className : 'sunken-ship',
  
   	events: {},
  
    initialize: function(options){
  		this.model = this.options.data;
  		this.SVGObject = this.options.SVGObject;
  
  		console.log(this.SVGObject);
  	},
  
  	render: function(){
  		var $this = this;
  
  		return this.$el.html(this.template());
  	}
  
  });
  
});
window.require.register("views/view", function(exports, require, module) {
  require('lib/view_helper');

  // Base class for all views.
  module.exports = Backbone.View.extend({
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    template: function() {},
    
    getRenderData: function() {
      if(this.model)
        return this.model.toJSON();
      else
        return {};
    },

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    afterRender: function() {},

    destroy: function(){
      if(this.model)
        this.model.off(null, null, this);

      this.$el.remove();
    }
  });
  
});
window.require.register("views/worldmap_view", function(exports, require, module) {
  var View = require('./view');
  var ProvinceView = require('./province_view');
  
  module.exports = View.extend({
    id: 'worldmap',
    template: require('./templates/worldmap'),
  
    initialize: function(options){
      this.model = options.provinces;
      this.borders = options.borders;
      this.locations = options.locations;
      this.fleets = options.fleets;
  
      this.fleetImages = [];
  
      _.bindAll(this, 'redraw', 'afterRender', 'moveTo');
  
      // define global world map settings
      this.worldmapSettings = {
        width: 8192, //$(window).width(),
        height: 6061, //$(window).height(),
  
        startOffsetX: -3000,
        startOffsetY: -1600,
  
        colors: {
          bg: '#D0E5F2',
          grid: '#b0b0b0',
  
          country: '#ffffff',
          borders: '#ff6060'
        }
      };
  
      // render the svg worldmap holder
      this.worldmapSVG = d3.select("body").append("svg")
        .attr("width", this.worldmapSettings.width)
        .attr("height", this.worldmapSettings.height);
  
      this.plot = this.worldmapSVG.append('g')
        .attr('class', 'plot');
  
      this.zoom = d3.behavior.zoom().scaleExtent([1,8]).on("zoom", this.redraw);
      this.worldmapSVG.call(this.zoom); 
  
      //d3.select('.plot').attr('transform', "translate("+ this.worldmapSettings.startOffsetX +", "+ this.worldmapSettings.startOffsetY +") scale(1,1)");
    },
  
    redraw: function(){
  
      //console.log(d3.event);
  
      var translation = d3.event.translate,
          newx = translation[0];// + this.worldmapSettings.startOffsetX,
          newy = translation[1];// + this.worldmapSettings.startOffsetY;
  
      d3.select('.plot')
        .transition()
        .attr('transform', "translate("+ newx +", "+ newy +")" + " scale(" + d3.event.scale + ")")
        .duration(50);
  
      // resize the fleet images
      /*
      $.each(this.fleetImages, function(idx, fleetImage){
        var width = fleetImage.attr('width');
        var height = fleetImage.attr('height');
  
        var newWidth = width * d3.event.scale;
        var newHeight = height * d3.event.scale;
  
        fleetImage.attr('width', newWidth);
        fleetImage.attr('height', newHeight);
  
        console.log(width);
      });
      */
    },
  
    getRenderData: function(){
    	return { };
    },
  
    render: function(){
      var $this = this;
  
      // render the world map json data to svg path objects
      $this.model.each(function(country, index){
  
        var g = $this.plot.append('g');
            
        var country = g.append('path')
              .attr('id', country.get('id'))
              .attr('class', 'province')
              .attr('d', country.get('path'))
              .attr('fill', $this.worldmapSettings.colors.country)
              .attr('title', country.get('id'))
              .on('mouseover', $this.provinceMouseover)
              .on('mouseout', $this.provinceMouseout)
              .on('click', $this.provinceClicked);
  
         // add the title
          //country
            //.append('title')
            //.text(country.get('id'));
  
      });
  
      var $borders = $this.plot.append('g').attr('class', 'borders');
  
      $this.borders.each(function(border, index){
        //console.log(border);
  
        $borders.append('path')
          .attr('id', 'path' + border.get('id'))
          .attr('class', 'border')
          .attr('d', border.get('path'))
          .attr('stroke', $this.worldmapSettings.colors.borders);
  
      });
  
      // render the locations
      var $locations = $this.plot.append('g').attr('class', 'locations');
  
      $this.locations.each(function(location, index){
        //console.log(location);
  
        $locations.append('circle')
          .attr('id', location.get('name'))
          .attr('class', 'location')
          .attr('r', 0.8)
          .attr('cx', location.get('x'))
          .attr('cy', location.get('y'))
          .attr('fill', $this.worldmapSettings.colors.borders);
  
      });
  
  
      // render the fleets
      //console.log($this.fleets);
      $this.fleets.each(function(fleet, index){
  
        // check if fleet has date in the past
        var positions = fleet.get('positions');
        var startDate = positions[0];
  
        if(startDate){
  
          // render object on map
          var fleetImage = $this.plot.append('image')
            .attr("xlink:href", "img/units/heavy_cruiser.svg")
            .attr("x", positions[1][0])
            .attr("y", positions[1][1])
            .attr("width", 64)
            .attr("height", 17);
  
          $this.fleetImages.push(fleetImage);
        }
  
        //console.log(startDate);
        //console.log(fleet);
  
      });
  
    	return this.$el;
    },
  
    provinceMouseover: function(elem){
      //d3.select(this).attr('fill', '#898899');
  
      //var title = d3.select(this).attr('title');
      //console.log(title);
  
      // get the intersection of the border paths
  
      //var el = d3.select(this).node().getPointAtLength(500);
      //console.log(el);
  
      //@TODO show tooltip with province name next to the mouse
    },
  
    provinceMouseout: function(elem){
      d3.select(this).attr('fill', '#fff');
    },
  
    // Open the dialog to see what is inside this province
    provinceClicked: function(elem){
      //console.log(this);
  
      //@TODO open province details
  
      //var provinceView = new ProvinceView({ provinceID: this.id });
      //provinceView.render();
    },
  
    afterRender: function(){
      var $this = this;
    },
  
    // move the viewport to a certain location
    moveTo: function(x, y){
  
      x = parseInt(x);
      y = parseInt(y);
  
      this.zoom.translate([x, y]);
      this.zoom.scale(4);
  
      this.plot
        .transition()
        .duration(800)
        .attr("transform", "translate(" +  (x + ((8192 - (8192 * 1))/2)) + ',' + (y + ((6061 - (6061 * 1))/2)) + ")scale(" + 4*1 + ")");  
  
    }
  
  });
  
});
