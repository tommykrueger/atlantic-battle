var Location = require('./location');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Location,
  url: './js/data/locations.json',

  initialize: function() {
    console.log('Locations loaded!');
  }
});