var View = require('./view');

module.exports = View.extend({
  id : '',
  className: 'fleet',

  //template: require('./templates/interface'),

  events: {
    'click .fleet': 'showFleetInfo',
  },

  initialize: function(options){

    _.bindAll(this, 'calculateEvents', 'calculateFleets', 'displayDate', 'gameLoop');
  },

  render: function(){

    return $this.$el;

  },

  showFleetInfo: function(){

  }
});
