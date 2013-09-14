var View = require('./view');

module.exports = View.extend({
  id: 'page',
  template: require('./templates/home'),

  initialize: function(){
		
	},

  getRenderData: function(){
		return { name: 'hello' };
  }
});
