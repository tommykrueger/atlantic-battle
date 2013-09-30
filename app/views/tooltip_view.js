var View = require('./view');

module.exports = View.extend({
  className : 'tooltip',

 	events: {},

  initialize: function(options){
		this.model = this.options.data;
		this.SVGObject = this.options.SVGObject;
	},

	render: function(){
		var $this = this;

		return this.$el.html(this.template());
	}

});
