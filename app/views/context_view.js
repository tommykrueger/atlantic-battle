var View = require('./view');
var StatisticsView = require('./statistics_view');

module.exports = View.extend({
  id: 'context-view',
  template: require('./templates/context'),

 	events: {
    'click .close-btn': 'close'
  },

  initialize: function(options){
		this.context = this.options.context;
		this.worldmap = this.options.worldmap;

		console.log('Context view loaded');

		this.setContext();

		_.bindAll(this, 'setContext', 'render', 'afterRender', 'close');
	},

	render: function(){
		
		this.$el.html(this.template(this.getRenderData()));
		this.afterRender();

		return this;
	},

	afterRender: function(){

	},

	setContext: function(){

		switch(this.context){
			case 'statistics':

				var statisticsView = new StatisticsView();
						this.$('#context-content').empty().append(statisticsView.render().el);
			break;
		}
	},

	close: function(event){
		var $this = this;
	
		$this.$el.fadeOut(250, function(){
			$this.destroy();
		});
	}

});
