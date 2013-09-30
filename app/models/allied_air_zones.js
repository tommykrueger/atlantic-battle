var AlliedAirZone = require('./allied_air_zone');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: AlliedAirZone,
  url: './js/data/allied_air_zones.json',

  initialize: function() {
    console.log('Air Zones loaded!');
  }
});