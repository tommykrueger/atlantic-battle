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
      var Config = require('lib/config');

      // Ideally, initialized classes should be kept in controllers & mediator.
      // If you're making big webapp, here's more sophisticated skeleton
      // https://github.com/paulmillr/brunch-with-chaplin
      this.homeView = new HomeView();
      this.router = new Router();
      this.config = new Config();

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
window.require.register("lib/config", function(exports, require, module) {
  /**
   * CONFIG file for
   *  
   * Add configuration of the app here
   */
  
  var View = require('views/view');
  
  module.exports = View.extend({
    template: false,
  
    initialize: function(){
  		
  		// add configuration vars to the window variable to enable app wide access
  		window.app_config = {
  
  			// worldmap
  
  			// submarine zones
  			submarineZoneDates: [
  		    ['01', '1939-09-01', '1940-03-01', 'German Submarine activity (Sep 1939 - Mar 1940)'],
  		    ['02', '1940-03-01', '1940-09-01', 'German Submarine activity (Mar 1940 - Sep 1940)'],
  		    
  		    ['03', '1940-09-01', '1941-03-01', 'German Submarine activity (Sep 1940 - Mar 1941)'],
  		    ['03-01', '1940-09-01', '1941-03-01', 'German Submarine activity (Sep 1940 - Mar 1941)'],
  		    
  		    ['04', '1941-03-01', '1941-09-01', 'German Submarine activity (Mar 1941 - Sep 1941)'],
  		    ['04-01', '1941-03-01', '1941-09-01', 'German Submarine activity (Mar 1941 - Sep 1941)'],
  
  		    ['05', '1941-09-01', '1942-03-01', 'German Submarine activity (Sep 1941 - Mar 1942)'],
  
  		    ['06', '1942-03-01', '1942-09-01', 'German Submarine activity (Mar 1942 - Sep 1942)'],
  		    ['06-01', '1942-03-01', '1942-09-01', 'German Submarine activity (Mar 1942 - Sep 1942)']
  		  ]
  
  		}
  
  		console.log(window);
  
  	}
  });
  
  
  
  
  
});
window.require.register("lib/router", function(exports, require, module) {
  var application = require('application');

  // models
  var Factions = require('models/factions');
  var Countries = require('models/countries');
  var Provinces = require('models/provinces');
  var Borders = require('models/borders');
  var Locations = require('models/locations');
  var Events = require('models/events');
  var Fleets = require('models/fleets');
  var ConvoyRoutes = require('models/convoy_routes');
  var Ships = require('models/ships');
  var SubmarineZones = require('models/submarine_zones');
  var AlliedAirZones = require('models/allied_air_zones');
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

      // add fix for the html body if we are in worldmap view
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
      var ships = new Ships();
      var submarineZones = new SubmarineZones();
      var alliedAirZones = new AlliedAirZones();
      var convoyRoutes = new ConvoyRoutes();
      var factions = new Factions();

      $.when(
        
        provinces.fetch(),
        borders.fetch(),
        locations.fetch(),
        fleets.fetch(),
        gameEvents.fetch(),
        ships.fetch(),
        submarineZones.fetch(),
        alliedAirZones.fetch(),
        convoyRoutes.fetch(),
        factions.fetch()

        ).done(function(){

        var worldmap = new Worldmap({ 
          provinces: provinces, 
          borders: borders, 
          locations: locations,
          fleets: fleets,
          submarineZones: submarineZones,
          alliedAirZones: alliedAirZones,
          convoyRoutes: convoyRoutes
        });
      
        $('body').append(worldmap.render().el);

        // initialize the game class
        var game = new Game({ 
          worldmap: worldmap,
          gameEvents: gameEvents,
          fleets: fleets,
          ships: ships,
          factions: factions        
        });

        game.beforeRender();

        var _interface = new Interface({ game: game, worldmap: worldmap });
        $('body').append(_interface.render().el); 
          
        var dialog = new Dialog({
          game: game,
          headline: 'Willkommen', 
          description: ' Hier sehen Sie eine interaktive Simulation der Atlantikschlacht des Zweiten Weltkrieges. \n\nBenutzen Sie die Icons oben, um nähere Informationen und Statistiken zu sehen. Mithilfe der Filterfunktionen am unteren Bildschirmrand können Sie zudem bestimmte Funktionen der Kartenansicht ein- und ausblenden.', 
          submit: 'Starten'
        });

        $('body').append(dialog.render().el);

      });
      
    }

  });
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
});
window.require.register("models/allied_air_zone", function(exports, require, module) {
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
window.require.register("models/allied_air_zones", function(exports, require, module) {
  var AlliedAirZone = require('./allied_air_zone');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: AlliedAirZone,
    url: './js/data/allied_air_zones.json',
  
    initialize: function() {
      console.log('Air Zones loaded!');
    }
  });
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
window.require.register("models/convoy_route", function(exports, require, module) {
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
window.require.register("models/convoy_routes", function(exports, require, module) {
  var ConvoyRoute = require('./convoy_route');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: ConvoyRoute,
    url: './js/data/convoy_routes.json',
  
    initialize: function() {
      console.log('Convoy Routes loaded!');
    }
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
window.require.register("models/faction", function(exports, require, module) {
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
window.require.register("models/factions", function(exports, require, module) {
  var Faction = require('./faction');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Faction,
    url: './js/data/faction_areas.json',
  
    initialize: function() {
      console.log('Factions loaded!');
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
window.require.register("models/ship", function(exports, require, module) {
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
window.require.register("models/ships", function(exports, require, module) {
  var Ship = require('./ship');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: Ship,
    url: './js/data/ships.json',
  
    initialize: function() {
      console.log('Ships loaded!');
    }
  });
});
window.require.register("models/submarine_zone", function(exports, require, module) {
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
window.require.register("models/submarine_zones", function(exports, require, module) {
  var SubmarineZone = require('./submarine_zone');
  var Collection = require('./collection');
  
  module.exports = Collection.extend({
    model: SubmarineZone,
    url: './js/data/submarine_zones.json',
  
    initialize: function() {
      console.log('Submarine zones loaded!');
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
window.require.register("views/context_diplomacy_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: 'feedback',
    template: require('./templates/context_diplomacy'),
  
   	events: {
  
    },
  
    initialize: function(options){
  
  	},
  
  });
  
});
window.require.register("views/context_events_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: 'feedback',
    template: require('./templates/context_events'),
  
   	events: {
  
    },
  
    initialize: function(options){
  
  	},
  
  });
  
});
window.require.register("views/context_feedback_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: 'feedback',
    template: require('./templates/context_feedback'),
  
   	events: {
      'click #submit-btn': 'submitForm'
    },
  
    initialize: function(options){
  		_.bindAll(this, 'submitForm');
  		console.log('render feedback view');
  	},
  
  	submitForm: function(event){
  		event.preventDefault();
  
  		var formData = $('#feedback-form').serialize();
  
  		$('#form-process').text('Sending... ').fadeIn(250);
  
  		$.ajax({
  		  //url: 'http://localhost/atlantic-battle/server/backend/events/send_email',
  		  url: 'http://tommykrueger.com/projects/atlantic-battle/server/backend/events/send_email',
  		  type: 'POST',
  		  data: formData,
  		  success: function(data) {
  				$('#form-process').text(data).delay(2500).fadeOut(250);
        }
  		});
  	}
  
  });
  
});
window.require.register("views/context_statistics_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: 'statistics',
    template: require('./templates/context_statistics'),
  
   	events: {
      'click #statistics-menu li': 'switchStatistic'
    },
  
    initialize: function(options){
  		//this.worldmap = this.options.worldmap;
  
  		this.plot = '#graph-plot';
  		this.SVGplot;
  
  		// 1. submarines / destroyers
  
  		this.data = [
  			{
  				'1938': [23],
  				'1939': [34],
  				'1940': [46],
  				'1941': [78]
  				
  			},
  			{
  				'1938': [7],
  				'1939': [12],
  				'1940': [13],
  				'1941': [25]
  			}
  		];
  
  
  		this.sunkSubs = [
  			[1939, 9],
  			[1940, 23],
  			[1941, 35],
  			[1942, 86],
  			[1943, 236],
  			[1944, 235],
  			[1945, 122]
  		];
  
  		// sunk ships in the atlantic
  		// year / sunk ships / sunk ships by submarines / sunk germany submarines
  
  		// source http://www.world-war-2.info/statistics/
  		this.sunkShips = [
  			[1939, 222, 114, 9],
  			[1940, 1059, 471, 23],
  			[1941, 1299, 432, 35],
  			[1942, 1664, 1160, 86],
  			[1943, 597, 377, 236],
  			[1944, 205, 132, 235],
  			[1945, 104, 56, 122]
  		];
  
  		console.log('loading statistics view');
  		_.bindAll(this, 'afterRender', 'switchStatistic', 'renderSubmarineLosses', 'renderStatisticPlot');
  	},
  
  	afterRender: function(){
  		this.renderStatisticPlot();
  	},
  
  	// render the D3 graph plot
  	switchStatistic: function(event){
  		var currentStatistic = $(event.target).attr('id');
  
  		console.log(currentStatistic);
  
  		switch(currentStatistic){
  			case 'submarine-losses':
  				this.renderSubmarineLosses();
  				break;
  		}
  	},
  
  	renderSubmarineLosses: function(){
  		var $this = this;
  
  		$('#graph-plot').empty();
  		$('#plot').empty();
  
  		d3.csv('data/submarine-losses.csv', function(data) {
  		  //data = JSON.stringify(data);
  
  		  var h = 400;
  
  		  $this.SVGplot = d3.select('#plot')
  				.append('svg')
  				.attr('width', 720)
  				.attr('height', 520)
  					.append('g')
  					.attr('transform', 'translate(48,48)');
  
  			var x = d3.scale.linear().domain([1939, 1945]).range([0, 580]);
  			var y = d3.scale.linear().domain([0, 50]).range([400, 0]);
  
  			var xAxis = d3.svg.axis()
  				.scale(x)
  				.orient('bottom')
  				.ticks(7)
  				.tickFormat(d3.format('.0f'));
  
  			var yAxis = d3.svg.axis()
  				.scale(y)
  				.orient('left')
  				.ticks(10);
  
  			y.domain([0, d3.max(data, function(d){ return d['Ships']; })]);
  
  
  			$this.SVGplot.append('g')
  				.attr('class', 'x axis')
  				.attr('transform', 'translate(48, 424)')
  				.call(xAxis);
  
  			$this.SVGplot.append('g')
  				.attr('class', 'y axis')
  				.attr('transform', 'translate(24, 0)')
  				.call(yAxis)
  					.append('text')
  					.attr('transform', 'translate(-64, 0) rotate(-90)')
  					.attr('y', 6)
  					.attr('dy', '.71em')
  					.style('text-anchor', 'end')
  					.text('Sunk Ships per year (Atlantic)');
  
  			$this.SVGplot.selectAll('rect')
       		.data(data)
     			.enter()
     				.append('rect')
     				.attr('fill', 'steelblue')
       			.attr('x', function(d, i) { 
       				console.log(d);
       				return x(d.year); 
       			})
       			.attr('y', function(d) { 
       				return h - y(d['Ships']) - .5;
       			})
       			.attr('width', 24)
       			.attr('height', function(d) {
       				return y(d['Ships']); 
       			});
  
  			$this.$('#graph-plot').html( $('#plot').html() );
  
  		});
  	},
  
  	renderStatisticPlot: function(){
  
  		console.log('rendering plot');
  		$('#graph-plot').empty();
  		$('#plot').empty();
  
  		this.SVGplot = d3.select('#plot')
  			.append('svg')
  			.attr('width', 720)
  			.attr('height', 520)
  				.append('g')
  				.attr('transform', 'translate(48,48)');
  
  		var x = d3.scale.linear().domain([1939, 1945]).range([0, 580]);
  		var y = d3.scale.linear().domain([0, 50]).range([400, 0]);
  
  		var xAxis = d3.svg.axis()
  			.scale(x)
  			.orient('bottom')
  			.ticks(7)
  			.tickFormat(d3.format('.0f'));
  
  		var yAxis = d3.svg.axis()
  			.scale(y)
  			.orient('left')
  			.ticks(12);
  
  		var line = d3.svg.line()
  			.interpolate('cardinal')
  			.x(function(d) { return x(d[0]); })
  			.y(function(d) { return y(d[1]); });
  
  		var lineSubs = d3.svg.line()
  			.interpolate('cardinal')
  			.x(function(d) { return x(d[0]); })
  			.y(function(d) { return y(d[2]); });
  
  		var lineSubsSunk = d3.svg.line()
  			.interpolate('cardinal')
  			.x(function(d) { return x(d[0]); })
  			.y(function(d) { return y(d[3]); });
  
  		//x.domain(d3.extent(this.sunkShips, function(d) { return d[0]; }));
  		y.domain([0, d3.max(this.sunkShips, function(d) { return d[1]; })]);
  
  		this.SVGplot.append('g')
  				.attr('class', 'x axis')
  				.attr('transform', 'translate(48, 424)')
  				.call(xAxis);
  
  		this.SVGplot.append('g')
  				.attr('class', 'y axis')
  				.attr('transform', 'translate(24, 0)')
  				.call(yAxis)
  					.append('text')
  					.attr('transform', 'translate(-64, 0) rotate(-90)')
  					.attr('y', 6)
  					.attr('dy', '.71em')
  					.style('text-anchor', 'end')
  					.text('Sunk Ships per year (Atlantic)');
  
  		var graph = this.SVGplot.selectAll('.line-graph')
  				.data(this.sunkShips[0])
  				.enter()
  				.append('g')
  				.attr('class', 'sunk-line-graph');
  
  		graph.append('path')
  				.attr('class', 'line sunk-ships-line')
  				.attr('transform', 'translate(48,0)')
  				.attr('d', line(this.sunkShips));
  
  		graph.append('path')
  			.attr('class', 'line sunk-ships-submarine-line')
  			.attr('transform', 'translate(48,0)')
  			.attr('d', lineSubs(this.sunkShips));
  
  		graph.append('path')
  			.attr('class', 'line sunk-submarines-line')
  			.attr('transform', 'translate(48,0)')
  			.attr('d', lineSubsSunk(this.sunkShips));
  
  
  		// add the dots
  		graph
  			.append('g')
  			.attr('class', 'circles')
  			.attr('transform', 'translate(48,0)')
  			.selectAll('circle')
  			.data( this.sunkShips )
  			.enter()
  			.append('circle')
  				.attr('class', 'amount amount-sunk-ships')
  				.attr('r', 4)
  				.attr('cx', function(d){
  					return x(d[0]);
  				})
  				.attr('cy', function(d){
  					return y(d[1]);
  				});
  
  		graph
  			.append('g')
  			.attr('class', 'circles')
  			.attr('transform', 'translate(48,0)')
  			.selectAll('circle')
  			.data( this.sunkShips )
  			.enter()
  			.append('circle')
  				.attr('class', 'amount amount-sunk-ships-submarine')
  				.attr('r', 4)
  				.attr('cx', function(d){
  					return x(d[0]);
  				})
  				.attr('cy', function(d){
  					return y(d[2]);
  				});
  
  		graph
  			.append('g')
  			.attr('class', 'circles')
  			.attr('transform', 'translate(48,0)')
  			.selectAll('circle')
  			.data( this.sunkShips )
  			.enter()
  			.append('circle')
  				.attr('class', 'amount amount-sunk-submarines')
  				.attr('r', 4)
  				.attr('cx', function(d){
  					return x(d[0]);
  				})
  				.attr('cy', function(d){
  					return y(d[3]);
  				});
  
  
  
  		var labels = this.SVGplot
  			.append('g')
  			.attr('class', 'labels')
  			.attr('transform', 'translate(460, 48)');
  
  			labels
  				.append('text')
  					.text('Total ships losses (Allies)')
  					.attr('fill', 'steelblue');
  
  			labels
  				.append('text')	
  					.text('Ship losses by submarines (Allies)')
  					.attr('fill', 'red')
  					.attr('transform', 'translate(0, 24)');
  
  			labels
  				.append('text')	
  					.text('Submarine losses (Axis)')
  					.attr('fill', 'green')
  					.attr('transform', 'translate(0, 48)');
  
  
  		this.$('#graph-plot').html( $('#plot').html() );
  
  	}
  
  });
  
});
window.require.register("views/context_units_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    id: 'feedback',
    template: require('./templates/context_units'),
  
   	events: {
  
    },
  
    initialize: function(options){
  
  	},
  
  });
  
});
window.require.register("views/context_view", function(exports, require, module) {
  var View = require('./view');
  var ContextUnitsView = require('./context_units_view');
  var ContextEventsView = require('./context_events_view');
  var ContextDiplomacyView = require('./context_diplomacy_view');
  var ContextStatisticsView = require('./context_statistics_view');
  var ContextFeedbackView = require('./context_feedback_view');
  
  module.exports = View.extend({
    id: 'context-view',
    template: require('./templates/context'),
  
   	events: {
      'click .close-btn': 'close'
    },
  
    initialize: function(options){
  		this.context = this.options.context;
  		this.worldmap = this.options.worldmap;
  
  		_.bindAll(this, 'setContext', 'render', 'afterRender', 'close');
  	},
  
  	afterRender: function(){
  		this.setContext();
  	},
  
  	setContext: function(){
  		var $this = this;
  
  		switch(this.context){
  			case 'units':
  
  				var contextUnitsView = new ContextUnitsView();
  				$this.$('#context-content').html(contextUnitsView.render().el);
  			break;
  			case 'events':
  
  				var contextEventsView = new ContextEventsView();
  				$this.$('#context-content').html(contextEventsView.render().el);
  			break;
  			case 'diplomacy':
  
  				var contextDiplomacyView = new ContextDiplomacyView();
  				$this.$('#context-content').html(contextDiplomacyView.render().el);
  			break;
  			case 'feedback':
  
  				var contextFeedbackView = new ContextFeedbackView();
  				$this.$('#context-content').html(contextFeedbackView.render().el);
  			break;
  			case 'statistics':
  
  				var contextStatisticsView = new ContextStatisticsView();
  				$this.$('#context-content').html(contextStatisticsView.render().el);
  			break;
  		}
  	},
  
  	close: function(event){
  		var $this = this;
  		$this.destroy();
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
      'click .event': 'showOnMap',
      'mouseenter .event': 'markOnMap'
    },
  
    initialize: function(options){
  		this.model = this.options.gameEvent;
  		this.worldmap = this.options.worldmap;
  
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
  
  		_.bindAll(this, 'render', 'afterRender', 'closeEvent', 'showOnMap', 'markOnMap');
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
  
  			$('.show-on-map-btn, .event').on('click', function(e){
  				var x = $(this).attr('x');
  				var y = $(this).attr('y');
  
  				$this.worldmap.moveTo(x, y); 
  			});
  		});
  	},
  
  	closeEvent: function(event){
  		var $this = this;
  
  		$this.$el.fadeOut(250, function(){
  			$this.destroy();
  		});
  	},
  
  	showOnMap: function(event){
  		console.log('moving map');
  	},
  
  	markOnMap: function(event){
  
  		this.worldmap.markPosition(
  			$(event.target).attr('x'),
  			$(event.target).attr('y')
  		); 
  	}
  
  });
  
});
window.require.register("views/faction_view", function(exports, require, module) {
  var View = require('./view');
  
  module.exports = View.extend({
    className : 'faction',
    template: require('./templates/faction'),
  
   	events: {
      'mouseenter': 'showInfo',
      'click path.ship': 'showInfo'
    },
  
    initialize: function(options){
  		this.model = this.options.factionPath;
  
  		_.bindAll(this, 'showInfo', 'hideInfo');
  	},
  
  	render: function(){
  		var $this = this;
  	 
      // append the faction path to the map
  		var g = d3.select('.factions')
        .append('path')
        .attr('id', 'faction-path-' + $this.model.get('id'))
        .attr('d', $this.model.get('d'))
        .attr('class', 'faction-path ' + $this.model.get('faction') )
        .attr('title', $this.model.get('name'))
        .attr('rel', 'faction-path-' + $this.model.get('id')) 
        .attr('faction', $this.model.get('faction')) 
        .on('mouseenter', $this.mouseenter)
        .on('mouseout', $this.mouseout)
        .on('mousemove', $this.mousemove);
  	},
  
  	mouseenter: function(elem){
      var factionName = d3.select(this).attr('faction');
  
      $('#tooltip #tooltip-content').html( factionName.toUpperCase() + ' Faction Border' );
  
      $('#tooltip').css({
        'left': d3.event.pageX + 24,
        'top': d3.event.pageY + 24
      });
      $('#tooltip').stop().fadeIn(24);
    },
  
    mouseout: function(elem){
      $('#tooltip').stop().fadeOut(24);
    },
  
    mousemove: function(elem){
      $('#tooltip').css({
        'left': d3.event.pageX + 24,
        'top': d3.event.pageY + 24
      });
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
  
  		'click #filter-list li': 'filterMap',
  		'click #pause-btn': 'pauseGame'
    },
  
    initialize: function(options){
  		this.game = this.options.game;
  		this.worldmap = this.options.worldmap;
  
  		_.bindAll(this, 'showScreen', 'pauseGame');
  
  		/*
  		this.ship_types = [
  			'CV': 'Aircraft Carrier',
  			'CVL': 'Light Aircraft Carrier'
  		];
  		*/
  	},
  
  	openShipDialog: function(event){
  		event.preventDefault();
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
  			$('#context-view').remove();
  			$('body').append(contextView.render().el);
  		}
  	},
  
  	// toggle the filter
  	filterMap: function(e){
  		e.preventDefault();
  
  		var $el = $(e.target);
  		var filter = $el.attr('id');
  
  		switch(filter){
  			case 'filter-borders':
  				console.log(filter, 'hiding borders');
  				d3.selectAll('.borders').classed('hidden');
  				break;
  
  			case 'filter-air-zones':
  
  				var status = $el.attr('class')
  				if(status == 'active') {
  					d3.selectAll('.air-zone').classed('hidden', false);
  					$el.attr('class', '');
  				}
  				else {
  					d3.selectAll('.air-zone').classed('hidden', true);
  					$el.attr('class', 'active');
  				}
  
  				break;
  
  			case 'filter-submarine-zones':
  
  				var status = $el.attr('class')
  				if(status == 'active') {
  					d3.selectAll('.submarine-zone').classed('hidden', false);
  					$el.attr('class', '');
  				}
  				else {
  					d3.selectAll('.submarine-zone').classed('hidden', true);
  					$el.attr('class', 'active');
  				}
  
  				break;
  
  			case 'filter-convoy-routes':
  
  				var status = $el.attr('class')
  				if(status == 'active') {
  					d3.selectAll('.convoy-route').classed('hidden', false);
  					$el.attr('class', '');
  				}
  				else {
  					d3.selectAll('.convoy-route').classed('hidden', true);
  					$el.attr('class', 'active');
  				}
  
  				break;
  
  			case 'filter-event':
  
  				var path_old = d3.select('#path2');
  				var path_new = d3.select('#path5').attr('d');
  
  				//console.log(path);
  
  				path_old.transition().duration(5000).attr('d', path_new);
  
  				break;
  
  			case 'filter-fullscreen':
  				this.toggleFullScreen();
  				break;
  		}
  		
  	},
  
  	// source: https://developer.mozilla.org/samples/domref/fullscreen.html
  	toggleFullScreen: function() {
  	  
  		var element = document.getElementById("body");
  
  	  // firefox and chrome
  		if(!document.mozFullScreen && !document.webkitFullScreen) {
        if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        }
        else{
          element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } 
      else{
        if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } 
        else{
          document.webkitCancelFullScreen();
        }
      }
    },
  
    pauseGame: function(event){
    	event.preventDefault();
  
    	console.log('pause clicked');
  
    	if(!$(event.target).hasClass('paused')) {
    		clearInterval(this.game.gameLoopInterval);
    		$(event.target).addClass('paused');
    	}
    	else{
    		this.game.gameLoopInterval = setInterval(this.game.gameIntervalFunction, 1000);
    		$(event.target).removeClass('paused');
    	}
    }
  
  });
  
});
window.require.register("views/location_view", function(exports, require, module) {
  var View = require('./view');
  var TooltipView = require('./tooltip_view');
  
  module.exports = View.extend({
    className : 'ship',
    template: require('./templates/location'),
  
   	events: {
      'mouseenter': 'showInfo',
      'click circle.ship': 'showInfo'
    },
  
    initialize: function(options){
  		this.model = this.options.location;
      this.worldmap = this.options.worldmap;
  
  		_.bindAll(this, 'showInfo', 'hideInfo');
  	},
  
  	render: function(){
  		var $this = this;
  	
  		// append the description text to the body as html
  		var g = d3.select('.ships')
        .append('g')
        .attr('class', function(){
          return 'ship-' + $this.model.get('id') + ' locale-' + $this.model.get('locale') + ' country-' + $this.model.get('country') + ' ship-class-' + $this.model.get('ship_class') + ' ship-type-' + $this.model.get('ship_type'); 
  
        })
        .attr('title', $this.model.get('name'))
        .attr('rel', 'ship-' + $this.model.get('id')) 
        .attr('width', 2)
        .attr('height', 2)
        .on('click', $this.shipMouseenter)
        .on('mouseenter', $this.shipMouseenter)
        .on('mouseout', $this.shipMouseout)
        .on('mousemove', $this.shipMousemove)
        .attr('transform', 'translate('+ $this.worldmap.projection([$this.model.get('y'), $this.model.get('x')]) +')');
  
      g.append('circle')
        .attr('r', 1.4)
        .style('opacity', 0)
        .transition()
        .duration(1500)
        .style('opacity', 1.0)
        .attr('class', function(){
        	return 'ship ' + $this.model.get('locale');
        });
  
      d3.select('.plot').append('circle')
       	.attr('class', 'explosion')
       	.attr('r', 1)
       	.transition()
        .attr('transform', 'translate('+ $this.worldmap.projection([$this.model.get('y'), $this.model.get('x')]) +')')
       	.duration(500)
       	.attr('r', 64)
       	.style('opacity', 0.0)
       	.remove();	 
  			
  		// add sunken ship report to the list
  		$('#sunk-reports').append($this.template( $this.model.toJSON() ));      
  	},
  
  	shipMouseenter: function(elem){
      var relatedEl = d3.select(this).attr('rel');
  
      $('#tooltip #tooltip-content').html( $('#' + relatedEl).html() );
      $('#tooltip').addClass('tooltip-ship');
  
      //check position
      
      $('#tooltip').css({
        'left': d3.event.pageX - 120,
        'top': d3.event.pageY - $('#tooltip').outerHeight() - 32
      });
      $('#tooltip').stop().fadeIn(0);
    },
  
    shipMouseout: function(elem){
      $('#tooltip').stop().fadeOut(0, function(){ $(this).removeClass('tooltip-ship'); });
    },
  
    shipMousemove: function(elem){
      $('#tooltip').css({
        'left': d3.event.pageX - 120,
        'top': d3.event.pageY - $('#tooltip').outerHeight() - 32
      });
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
window.require.register("views/ship_view", function(exports, require, module) {
  var View = require('./view');
  var TooltipView = require('./tooltip_view');
  
  module.exports = View.extend({
    className : 'ship',
    template: require('./templates/ship'),
  
   	events: {
      'mouseenter': 'showInfo',
      'click circle.ship': 'showInfo'
    },
  
    initialize: function(options){
  		this.model = this.options.ship;
      this.worldmap = this.options.worldmap;
  
  		_.bindAll(this, 'showInfo', 'hideInfo');
  	},
  
  	render: function(){
  		var $this = this;
  	
  		// append the description text to the body as html
  		var g = d3.select('.ships')
        .append('g')
        .attr('class', function(){
          return 'ship-' + $this.model.get('id') + ' locale-' + $this.model.get('locale') + ' country-' + $this.model.get('country') + ' ship-class-' + $this.model.get('ship_class') + ' ship-type-' + $this.model.get('ship_type'); 
  
        })
        .attr('title', $this.model.get('name'))
        .attr('rel', 'ship-' + $this.model.get('id')) 
        .attr('width', 2)
        .attr('height', 2)
        .on('click', $this.shipMouseenter)
        .on('mouseenter', $this.shipMouseenter)
        .on('mouseout', $this.shipMouseout)
        .on('mousemove', $this.shipMousemove)
        .attr('transform', 'translate('+ $this.worldmap.projection([$this.model.get('y'), $this.model.get('x')]) +')');
  
      g.append('circle')
        .attr('r', 1.4)
        .style('opacity', 0)
        .transition()
        .duration(1500)
        .style('opacity', 1.0)
        .attr('class', function(){
        	return 'ship ' + $this.model.get('locale');
        });
  
      g.append('circle')
       	.attr('class', 'explosion')
       	.attr('r', 1)
       	.transition()
       	.duration(1200)
       	.attr('r', 48)
       	.style('opacity', 0.0)
       	.remove();	 
  			
  		// add sunken ship report to the list
  		$('#sunk-reports').append($this.template( $this.model.toJSON() ));      
  	},
  
  	shipMouseenter: function(elem){
      var relatedEl = d3.select(this).attr('rel');
  
      $('#tooltip #tooltip-content').html( $('#' + relatedEl).html() );
      $('#tooltip').addClass('tooltip-ship');
  
      //check position
      
      $('#tooltip').css({
        'left': d3.event.pageX - 120,
        'top': d3.event.pageY - $('#tooltip').outerHeight() - 32
      });
      $('#tooltip').stop().fadeIn(0);
    },
  
    shipMouseout: function(elem){
      $('#tooltip').stop().fadeOut(0, function(){ $(this).removeClass('tooltip-ship'); });
    },
  
    shipMousemove: function(elem){
      $('#tooltip').css({
        'left': d3.event.pageX - 120,
        'top': d3.event.pageY - $('#tooltip').outerHeight() - 32
      });
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
window.require.register("views/templates/context_diplomacy", function(exports, require, module) {
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
        __out.push('<h2>Coming Soon</h2>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/context_events", function(exports, require, module) {
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
        __out.push('<h2>Coming Soon</h2>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/context_feedback", function(exports, require, module) {
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
        __out.push('<form id="feedback-form" action="" method="post">\n\n  <h2>Giving feedback is important</h2>\n  <p>If you have important informations or any other hint, please let me know</p>\n\n  <div class="input-wrap">\n    <select id="subject" name="subject">\n      <option value="">Choose Subject</option>\n      <option value="Event">Event</option>\n      <option value="Ship">Ship</option>\n      <option value="Website">Event</option>\n      <option value="Other">Other</option>\n    </select>\n  </div>\n\n  <div class="input-wrap">\n    <input type="text" id="name" name="name" placeholder="Your Name" />\n  </input>\n\n  <div class="input-wrap">\n    <input type="email" id="email" name="email" placeholder="Email" />\n  </div>\n\n  <div class="input-wrap">\n    <label for="message">Please give me some information</label> <br/>\n    <textarea id="message" name="message" placeholder="Message"></textarea>\n  </div>\n\n  <div class="input-wrap">\n    <input type="submit" id="submit-btn" name="submit-btn" value="send" />\n  </div>\n\n  <div id="form-process"></div>\n\n</form>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/context_statistics", function(exports, require, module) {
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
        __out.push('<div id="content-left">\n\t<ul id="statistics-menu">\n\t\t<li id="sunken-ships"> &raquo; Show Sunken Ships</li>\n\t\t<li id="ships-comparison"> &raquo; Ships Comparison</li>\n\t\t<li id="ship-production"> &raquo; Ships Production</li>\n    <li id="submarine-losses"> &raquo; Submarine Losses (Ger)</li>\n\t</ul>\n</div>\n\n<div id="content-right">\n\t<div id="graph-plot"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/context_units", function(exports, require, module) {
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
        __out.push('<h2>Coming Soon</h2>');
      
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
        __out.push('<li class="event" id="event-');
      
        __out.push(__sanitize(this.id));
      
        __out.push('" x="');
      
        __out.push(__sanitize(this.x));
      
        __out.push('" y="');
      
        __out.push(__sanitize(this.y));
      
        __out.push('">\n  <span class="event-date">');
      
        __out.push(__sanitize(this.date));
      
        __out.push('</span>\n\t<span class="event-title">');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</span>\n\t<span class="event-description">');
      
        __out.push(__sanitize(this.description));
      
        __out.push('</span>\n\n\t<div class="event-actions">\n\t\t');
      
        if (this.x && this.y) {
          __out.push('\n\t\t\t<span class="show-on-map-btn" x="');
          __out.push(__sanitize(this.x));
          __out.push('" y="');
          __out.push(__sanitize(this.y));
          __out.push('">&raquo; show on map</span>\n\t\t');
        }
      
        __out.push('\n    <span class="close-btn"> &times;</span>\n\t</div>\n</li>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("views/templates/faction", function(exports, require, module) {
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
        __out.push('<div id="home">\n\t<div id="content">\n  \t<h1>Die Atlantikschlacht</h1>\n\n\t  <ul id="home-list">\n\t  \t<li class="column">\n\t  \t\t<p>\n\t  \t\t\tMit Ausbruch des Zweiten Weltkrieges in Europa am 01. September 1939 begann zugleich die längste und vielleicht \n\t  \t\t\tauch wichtigste Schlacht des Krieges - die Atlantikschlacht.\n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\tDie Deutsche Kriegsmarine versuchte dabei die Britische Handelsschifffahrt durch Angriffe von Über- und Unterwasserschiffen \n\t  \t\t\tzu beeinträchtigen. Das Ziel bestand darin Großbritannien durch eine Seeblockade von allen Seewegen und Importen abzuschneiden, \n\t  \t\t\tum so das Land zur Kapitulation zu zwingen. \n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\tDa Großbritanniens Wirtschaft und Rüstung stark abhängig von Importen war, musste gewährleistet werden, dass die Schifffahrtswege\n\t  \t\t\tgeschützt werden. Schiffe die den Atlantik in Richtung der Britischen Inseln ansteuerten, wurden in Konvois zusammengefasst und von Kriegsschiffen eskortiert. Im Verlauf des Krieges stieg die Zahl der eingesetzten Kriegsschiffe kontinuierlich an.\n\t  \t\t</p>\n\t  \t</li>\n\t  \t<li class="column">\n\t  \t\t<p>\n\t  \t\t\tDie Besetzung Norwegens und Fankreichs im Frühjahr 1940 ermöglichte es der Deutschen Kriegsmarine ihre Schiffe \n\t  \t\t\tund U-Boote außerhalb Deutschlands zu stationieren, um einen besseren Zugang zum Atlantik zu erlangen. Großbritannien war während dieser Zeit gezwungen sich gegen die Achsenmächte in Europa allein zu verteidigen.\n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\t<img src="img/photos/the-battle-of-the-north-atlantic-allied-convo-L-QZQh3B.jpeg" title="Photo " />\n\t  \t\t</p>\n\t  \t</li>\n\t  \t<li class="column">\n\t  \t\t<p>\n\t  \t\t\tMit dem Kriegseintritt der USA änderte sich die startegische Situation in der Atlantikschlacht erheblich.\n\t  \t\t\tNun konnten die Alliierten das nahezu unerschöpfliche Rüstungspotential der USA ausnutzen. Die Devise hieß Mehr Schiffe zu bauen, als der Gegner versenken kann. Gleichzeitig wurde durch die Einführung neuer Technologien, wie dem Sonar und das Radar sowie Fortschritte in der Entschlüsselung der Deutschen Kommunikationsstruktur die Deutsche U-Bootflotte zunehmend in die defensive gedrängt.\n\n\t  \t\t\tMan erwartete eine erneute Wende der Schlacht durch den Einsatz neuer U-Boottypen.\n\t  \t\t</p>\n\t  \t\t<p>\n\t  \t\t\tDas Ende des Zweiten Weltkrieges in Europa war auch das Ende der Atlantkischlacht, \n\t  \t\t\tInsgesamt forderte die Schlacht zur See mehr als 90.000 Menschenleben <span class="text-small">(Quelle. <a href="http://en.wikipedia.org/wiki/Battle_of_the_Atlantic" target="_blank">Wikipedia</a>)</small>.\n\t  \t\t</p>\n\t  \t</li>\n\t  </ul>\n\n\t  <ul id="navigation">\n\t  \t<li><a class="btn" id="home-list-prev-btn" href="#">&laquo; zurück</a></li>\n\t  \t<li><a class="btn start-btn" href="#worldmap"> Los geht\'s</a></li>\n\t  \t<li><a class="btn" id="home-list-next-btn" href="#">weiterlesen &raquo;</a></li>\n\t  </ul>\n\n\t</div>\n</div>\n\n<!--\n<footer id="footer"> \n\t<ul id="footer-menu">\n\t\t<li id="home"><a href="/">Home</a></li>\n\t\t<li id="impressum"><a href="#imprint">Impressum</a></li>\n\t\t<li id="project"><a href="#project">Projekt</a></li>\n\t\t<li id="feedback"><a href="#feedback">Feedback</a></li>\n\t</ul>\n</footer>\n-->');
      
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
        __out.push('<div id="interface">\n\t<div id="header">\n\t\t<div id="game-time">\n\t\t\t<a id="pause-btn" href="#"></a>\n\t\t\t<span id="weekday"></span>\n\t\t</div>\n\t\t<div id="mainmenu-container">\n\t\t\t<ul id="mainmenu">\n\t\t\t\t<!--<li id="production" title="Production">P</li>-->\n\t\t\t\t<li id="units" title="Units">U</li>\n\t\t\t\t<li id="events" title="Event History">E</li>\n\t\t\t\t<li id="diplomacy" title="Diplomacy">D</li>\n\t\t\t\t<li id="statistics" title="Statistics">S</li>\n\t\t\t\t<li id="feedback" title="Feedback">F</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</div>\n\n\n<div id="map-details"></div>\n\n<ul id="map-modes"></ul>\n<div id="minimap"></div>\n</div>\n\n<div id="filter-container">\n\t<ul id="filter-list">\n\t\t<li id="filter-submarine-zones" title="Submarine Zones">S</li>\n\t\t<li id="filter-air-zones" title="Toggle Air Zones">A</li>\n\t\t<li id="filter-borders" title="Toggle Borders">B</li>\n\t\t<li id="filter-convoy-routes" title="Toggle Convoy Routes">C</li>\n\t\t<li id="filter-fullscreen" title="Fullscreen">F</li>\n\t</ul>\n</div>\n\n<ul id="sunk-reports"></ul>\n<ul id="ship-list"></ul>\n<ul id="events-list"></ul>\n\n\n<!-- container will hold the scvg plot, container element must be rendered at startup -->\n<div id="plot"></div>\n\n<div id="tooltip">\n\t<div id="tooltip-content"></div>\n  <span class="arrow"></span>\n</div>\n\n\n\n');
      
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
window.require.register("views/templates/ship", function(exports, require, module) {
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
        __out.push('<li id="ship-');
      
        __out.push(__sanitize(this.id));
      
        __out.push('">\n  <table cellspacing="0" cellpadding="0">\n    <tr>\n      <td class="label">Date</td>\n      <td>');
      
        __out.push(__sanitize(this.sunk_date));
      
        __out.push('</td>\n    </tr>\n    <tr>\n      <td class="label">Name</td>\n      <td>');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</td>\n    </tr>\n    <tr>\n      <td class="label">Type</td>\n      <td>');
      
        __out.push(__sanitize(this.ship_type));
      
        __out.push(' (');
      
        __out.push(__sanitize(this.ship_class));
      
        __out.push(')</td>\n    </tr>\n    <tr>\n      <td class="label">Country</td>\n      <td>');
      
        __out.push(__sanitize(this.country));
      
        __out.push('</td>\n    </tr>\n    <tr>\n      <td class="label">Report</td>\n      <td>');
      
        __out.push(__sanitize(this.sunk_report));
      
        __out.push('</td>\n    </tr>\n    <tr>\n      <td class="label">Losses</td>\n      <td>');
      
        __out.push(__sanitize(this.seamen_losses));
      
        __out.push(' men</td>\n    </tr>\n  </table>\n\n  ');
      
        if (this.source) {
          __out.push('\n  <img src="');
          __out.push(__sanitize(this.source));
          __out.push('" class="ship-source "/>\n  ');
        }
      
        __out.push('\n</li>');
      
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
        __out.push('<div id="tooltip">\n\t<div id="tooltip-content">\n    ');
      
        __out.push(__sanitize(this.description));
      
        __out.push('\n  </div>\n  <span class="arrow"></span>\n</div>');
      
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
    className : 'tooltip',
  
   	events: {},
  
    initialize: function(options){
  		this.model = this.options.data;
  		this.SVGObject = this.options.SVGObject;
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
      this.submarineZones = options.submarineZones;
      this.alliedAirZones = options.alliedAirZones;
      this.convoyRoutes = options.convoyRoutes;
  
      this.submarineZonesPaths = [];
       
      this.fleetImages = [];
  
      // start-date | end-date
      this.submarineZoneDates = [
        ['z-1', '1939-09-01', '1940-03-01', 'German Submarine activity <br/><i>(Sep 1939 - Mar 1940)</i>'],
        ['z-2', '1940-03-01', '1940-09-01', 'German Submarine activity <br/><i>(Mar 1940 - Sep 1940)</i>'],
        
        ['z-3', '1940-09-01', '1941-03-01', 'German Submarine activity <br/><i>(Sep 1940 - Mar 1941)</i>'],
        ['z-4', '1940-09-01', '1941-03-01', 'German Submarine activity <br/><i>(Sep 1940 - Mar 1941)</i>'],
        
        ['z-5', '1941-03-01', '1941-09-01', 'German Submarine activity <br/><i>(Mar 1941 - Sep 1941)</i>'],
        ['z-6', '1941-03-01', '1941-09-01', 'German Submarine activity <br/><i>(Mar 1941 - Sep 1941)</i>'],
  
        ['z-7', '1941-09-01', '1942-03-01', 'German Submarine activity <br/><i>(Sep 1941 - Mar 1942)</i>'],
  
        ['z-8', '1942-03-01', '1942-09-01', 'German Submarine activity <br/><i>(Mar 1942 - Sep 1942)</i>'],
        ['z-9', '1942-03-01', '1942-09-01', 'German Submarine activity <br/><i>(Mar 1942 - Sep 1942)</i>'],
  
        ['z-10', '1942-09-01', '1943-06-01', 'German Submarine activity <br/><i>(Sep 1942 - May 1943)</i>'],
        ['z-11', '1942-09-01', '1943-06-01', 'German Submarine activity <br/><i>(Sep 1942 - May 1943)</i>'],
        ['z-12', '1942-09-01', '1943-06-01', 'German Submarine activity <br/><i>(Sep 1942 - May 1943)</i>'],
  
        ['z-13', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>'],
        ['z-14', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>'],
        ['z-15', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>'],
        ['z-16', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>']
      ];
  
  
      _.bindAll(this, 'redraw', 'afterRender', 'moveTo', 'markPosition');
  
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
  
      this.plot = this.worldmapSVG.append('g').attr('class', 'plot');
  
      // add svg g objects for svg ordering
      this.countriesSVG = this.plot.append('g').attr('class', 'countries');
      this.bordersSVG = this.plot.append('g').attr('class', 'borders');
      this.fationsSVG = this.plot.append('g').attr('class', 'factions');
      this.submarineZonesSVG = this.plot.append('g').attr('class', 'submarine-zones');
      this.airZonesSVG = this.plot.append('g').attr('class', 'air-zones');
      this.convoyRoutesSVG = this.plot.append('g').attr('class', 'convoy-routes');
      this.locationsSVG = this.plot.append('g').attr('class', 'locations');
      this.shipsSVG = this.plot.append('g').attr('class', 'ships');
   
  
      this.zoom = d3.behavior.zoom().scaleExtent([1,12]).on("zoom", this.redraw);
      this.worldmapSVG.call(this.zoom); 
  
  
      // our map is a miller projection so we need to convert the lat / long to miller appropriate positions
      // http://bl.ocks.org/mbostock/3734333
      // http://commons.wikimedia.org/wiki/File:Blank_map_world_gmt_(more_simplified).svg
      this.projection = d3.geo.miller()
        .scale((2270 + 1) / 2 / Math.PI)
        .translate([2270 / 2 + -2.8, 1666 / 2 + 53])
        .precision(.1);
    },
  
    redraw: function(){
  
      var translation = d3.event.translate,
          newx = translation[0];
          newy = translation[1];
  
      d3.select('.plot')
        .transition()
        .attr('transform', "translate("+ newx +", "+ newy +")" + " scale(" + d3.event.scale + ")")
        .duration(50);
    },
  
    getRenderData: function(){
    	return { };
    },
  
    render: function(){
      var $this = this;
      
      // render the world map json data to svg path objects
      $this.model.each(function(country, index){
  
        var country = $this.countriesSVG
              .append('path')
              .attr('id', country.get('id'))
              .attr('class', 'province')
              .attr('rel', country.get('rel'))
              .attr('d', country.get('path'))
              .attr('fill', $this.worldmapSettings.colors.country)
              .attr('title', country.get('id'))
              .on('mouseenter', $this.provinceMouseover)
              .on('mouseout', $this.provinceMouseout)
              .on('mousemove', $this.provinceMousemove)
              .on('click', $this.provinceClicked);
      });
  
  
      /*
      $this.borders.each(function(border, index){
  
        $this.bordersSVG
          .append('path')
          .attr('id', 'path' + border.get('id'))
          .attr('class', 'border')
          .attr('d', border.get('path'));
  
      });
      */
  
      // render the locations
      $this.locations.each(function(location, index){
  
        if(location.get('location_type') == 'capital'){
          $this.locationsSVG
            .append('image')
            .attr("xlink:href", "img/map/star.svg")
            .attr('id', location.get('name'))
            .attr('class', 'location capital')
            .attr('width', 1.4)
            .attr('height', 1.4)
            .attr('transform', function(){
              return "translate(" + $this.projection([location.get('y'), location.get('x')]) + ")";  
            });
        }
        else{
          $this.locationsSVG
            .append('rect')
            .attr('id', location.get('name'))
            .attr('class', 'location')
            .attr('width', 0.8)
            .attr('height', 0.8)
            .attr('transform', function(){
              return "translate(" + $this.projection([location.get('y'), location.get('x')]) + ")";  
            })
            .attr('fill', $this.worldmapSettings.colors.borders);
        }
      });
  
  
  
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
  
      });
  
  
      // render submarine zones
      _.each(this.submarineZones.models, function(zone, idx){ 
        var startDate = null;
        var endDate = null;
  
        var path = $this.submarineZonesSVG
          .append('path')
            .attr('id', zone.get('id'))
            .attr('rel', zone.get('rel'))
            .attr('title', function(d, i){ 
  
              // find the date from the list
              var p = null;
              _.each($this.submarineZoneDates, function(date, zoneIdx){
  
                var d = date[0].toString();
                if(d == zone.get('rel')){
                  p = date[3];
                }
                  
              });
  
              return p;
            })
            .attr('class', 'submarine-zone inactive')
            .attr('start_date', function(d, i){ 
  
              // find the date from the list
              var p = null;
              _.each($this.submarineZoneDates, function(date, zoneIdx){
  
                var d = date[0].toString();
                if(d == zone.get('rel')){
                  startDate = date[1];
                  p = date[1];
                }
                  
              });
  
              return p;
            })
            .attr('end_date', function(d, i){
             // find the date from the list
              var p = null;
              _.each($this.submarineZoneDates, function(date, zoneIdx){
  
                var d = date[0].toString();
                if(d == zone.get('rel')){
                  endDate = date[2];
                  p = date[2];
                }
                  
              });
  
              return p;
            })
            .attr('d', zone.get('d'))
            .on('mouseenter', function(d, i){
  
              $('#tooltip #tooltip-content').html( d3.select(this).attr('title') );
  
              $('#tooltip').css({
                'left': d3.event.pageX + 24,
                'top': d3.event.pageY + 24
              });
              
              $('#tooltip').stop().fadeIn(24);
            })
            .on('mouseout', $this.provinceMouseout)
            .on('mousemove', $this.provinceMousemove);
  
          var obj = [
            path, 
            startDate, 
            endDate
          ];  
  
          $this.submarineZonesPaths.push(obj);
      });
  
  
      $this.alliedAirZones.each(function(zone, index){
  
        // render object on map
        $this.airZonesSVG
          .append('circle')
            .attr('class', 'air-zone hidden')
            .attr('r', zone.get('r'))
            .attr('cx', zone.get('cx'))
            .attr('cy', zone.get('cy'))
            .on('mouseenter', $this.provinceMouseover)
            .on('mousemove', $this.provinceMousemove)
            .on('mouseout', $this.provinceMouseout);
  
      });
  
      $this.convoyRoutes.each(function(route, index){
  
        // render object on map
        var convoyRoute = 
          $this.convoyRoutesSVG
            .append('path')
              .attr('class', 'convoy-route')
              .attr('d', route.get('d'))
              .attr('rel', route.get('rel'))
              .on('mouseenter', $this.provinceMouseover)
              .on('mousemove', $this.provinceMousemove)
              .on('mouseout', $this.provinceMouseout);
  
        // add animation
        var convoyNode = convoyRoute.node();
        var convoyLength = convoyNode.getTotalLength();
  
        /*
        var circle = $this.plot.append("circle")
          .attr({
            r: 2,
            fill: '#f33',
              transform: function () {
                  var p = convoyNode.getPointAtLength(0);
                  return "translate(" + [p.x, p.y] + ")";
              }
          });
  
        circle.transition()
          .duration(100000)
          .ease("linear")
          .attrTween("transform", function (d, i) {
            return function (t) {
                var p = convoyNode.getPointAtLength(convoyLength*t);
                return "translate(" + [p.x, p.y] + ")";
            }
        });
      */
  
      });
  
    	return this.$el;
    },
  
    provinceMouseover: function(elem){
      //console.log(this);
      var name = d3.select(this).attr('rel');
  
      console.log(name);
  
      $('#tooltip #tooltip-content').html(name);
  
      $('#tooltip').css({
        'left': d3.event.pageX + 24,
        'top': d3.event.pageY + 24
      });
      $('#tooltip').stop().fadeIn(24);
  
      //var title = d3.select(this).attr('title');
      //console.log(title);
  
      // get the intersection of the border paths
  
      //var el = d3.select(this).node().getPointAtLength(500);
      //console.log(el);
  
      //@TODO show tooltip with province name next to the mouse
    },
  
    provinceMouseout: function(elem){
      $('#tooltip').stop().fadeOut(24);
    },
  
    provinceMousemove: function(elem){
      $('#tooltip').css({
        'left': d3.event.pageX + 24,
        'top': d3.event.pageY + 24
      });
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
  
      zoomLevel = 5;
  
      var trans = this.projection([y, x]);
      trans[0] = - ( (trans[0] * zoomLevel) - $(window).width() / 2);
      trans[1] = - ( (trans[1] * zoomLevel) - $(window).height() / 2);
  
      this.zoom.translate([trans[0], trans[1]]);
      this.zoom.scale( zoomLevel );
  
      this.plot
        .transition()
        .duration(1200)
        .attr("transform", "translate("+ trans +")scale(" + zoomLevel + ")");  
    },
  
    // mark the position on the map
    markPosition: function(x, y){
      var $this = this;
  
      d3.select('.plot').append('circle')
        .attr('class', 'explosion')
        .attr('r', 1)
        .attr('cx', 0.7)
        .attr('cy', 0.7)
        .attr('transform', function(){
          return "translate(" + $this.projection([y, x]) + ")";  
        })
        .attr('stroke', '#999')
        .transition()
        .duration(1000)
        .attr('r', 16)
        .style('opacity', 0.1)
        .remove();   
    }
  
  });
  
});
