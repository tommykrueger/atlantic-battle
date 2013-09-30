var Ship = require('./ship');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Ship,
  url: './js/data/ships.json',

  initialize: function() {
    console.log('Ships loaded!');
  }
});