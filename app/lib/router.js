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
