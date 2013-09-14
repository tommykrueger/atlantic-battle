var Fleet = require('./fleet');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Fleet,
  url: './js/data/fleets.json',

  initialize: function() {
    console.log('Fleets loaded!');
  }
});