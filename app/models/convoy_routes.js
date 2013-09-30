var ConvoyRoute = require('./convoy_route');
var Collection = require('./collection');

module.exports = Collection.extend({
  model: ConvoyRoute,
  url: './js/data/convoy_routes.json',

  initialize: function() {
    console.log('Convoy Routes loaded!');
  }
});