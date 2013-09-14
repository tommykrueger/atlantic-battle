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