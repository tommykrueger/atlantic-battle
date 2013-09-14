var View = require('./view');

module.exports = View.extend({
  className : 'sunken-ship',

 	events: {},

  initialize: function(options){
		this.model = this.options.data;
		this.SVGObject = this.options.SVGObject;

		console.log(this.SVGObject);
	},

	render: function(){
		var $this = this;

		return this.$el.html(this.template());
	}

});
