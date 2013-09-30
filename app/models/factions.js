var Faction = require('./faction');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Faction,
  url: './js/data/faction_areas.json',

  initialize: function() {
    console.log('Factions loaded!');
  }
});