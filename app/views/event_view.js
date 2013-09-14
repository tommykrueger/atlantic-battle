var View = require('./view');

module.exports = View.extend({
  id: '',
  template: require('./templates/event'),

 	events: {
    'click .close-btn': 'closeEvent',
    'click .show-on-map-btn': 'showOnMap'
  },

  initialize: function(options){
		this.model = this.options.gameEvent;
		this.worldmap = this.options.worldmap;

		console.log('Event view loaded');

		/*
		this.date = this.model.attributes.date;
		this.date = this.date.split('-');

		this.date = new Date(
			this.date[0],
			this.date[1]-1,
			this.date[2]
		);

		this.model.attributes.date = this.date.getDate();
		*/

		_.bindAll(this, 'render', 'afterRender', 'closeEvent', 'showOnMap');
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

	closeEvent: function(event){
		var $this = this;
		console.log('closing event');

		$this.$el.fadeOut(250, function(){
			$this.destroy();
		});
	},

	showOnMap: function(event){
		console.log('moving map');
	}

});
