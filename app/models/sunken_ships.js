var SunkenShip = require('./sunken_ship');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: SunkenShip,
  url: './js/data/sunken_ships.json',

  initialize: function() {
    console.log('Sunken Ships loaded!');
  }
});