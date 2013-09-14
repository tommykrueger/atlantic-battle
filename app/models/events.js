var Event = require('./event');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: Event,
  url: './js/data/events.json',

  initialize: function() {
    console.log('Events loaded!');
  }
});