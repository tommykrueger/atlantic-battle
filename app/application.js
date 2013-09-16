// Application bootstrapper.
Application = {
  initialize: function() {
    var HomeView = require('views/home_view');
    var Router = require('lib/router');
    var Config = require('lib/config');

    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    this.homeView = new HomeView();
    this.router = new Router();
    this.config = new Config();

    if (typeof Object.freeze === 'function') Object.freeze(this);
  }
}

module.exports = Application;
