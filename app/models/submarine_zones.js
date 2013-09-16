var SubmarineZone = require('./submarine_zone');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: SubmarineZone,
  url: './js/data/submarine_zones.json',

  initialize: function() {
    console.log('Submarine zones loaded!');
  }
});