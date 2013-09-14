var View = require('./view');

module.exports = View.extend({
  id: 'statistics',
  template: require('./templates/statistics'),

 	events: {
    'click #statistics-menu li': 'switchStatistic'
  },

  initialize: function(options){
		//this.worldmap = this.options.worldmap;

		_.bindAll(this, 'render', 'afterRender', 'switchStatistic');
	},

	render: function(){
		
		this.$el.html(this.template(this.getRenderData()));
		this.afterRender();

		return this;
	},

	afterRender: function(){
		var $this = this;

		// add event listener by jQuery due to backbone issue
		_.defer(function(){

			$('.show-on-map-btn').on('click', function(e){
				var x = $(this).attr('x');
				var y = $(this).attr('y');

				$this.worldmap.moveTo(x, y); 
			});
		});
	},

	// render the D3 graph plot
	switchStatistic: function(event){
		var currentStatistic = $(event.target).attr('id');
		
	}

});
