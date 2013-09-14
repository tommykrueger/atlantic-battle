var Province = require('./province');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Province,
  url: './js/data/provinces.json',

  initialize: function() {
    console.log('Provinces loaded!');
  }
});