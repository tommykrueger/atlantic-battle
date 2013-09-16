var application = require('application');

// models
var Countries = require('models/countries');
var Provinces = require('models/provinces');
var Borders = require('models/borders');
var Locations = require('models/locations');
var Events = require('models/events');
var Fleets = require('models/fleets');
var SunkenShips = require('models/sunken_ships');
var SubmarineZones = require('models/submarine_zones');
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
    var submarineZones = new SubmarineZones();

    $.when(
      
      provinces.fetch(),
      borders.fetch(),
      locations.fetch(),
      fleets.fetch(),
      gameEvents.fetch(),
      sunkenShips.fetch(),
      submarineZones.fetch()

      ).done(function(){

      var worldmap = new Worldmap({ 
        provinces: provinces, 
        borders: borders, 
        locations: locations,
        fleets: fleets,
        submarineZones: submarineZones
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
