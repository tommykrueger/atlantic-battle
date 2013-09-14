var Border = require('./border');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Border,
  url: './js/data/borders.json',

  initialize: function() {
    console.log('Borders loaded!');
  }
});