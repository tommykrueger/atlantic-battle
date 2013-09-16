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

		_.bindAll(this, 'setContext', 'render', 'afterRender', 'close');
	},

	afterRender: function(){
		this.setContext();
	},

	setContext: function(){
		var $this = this;
		switch(this.context){
			case 'statistics':

				var statisticsView = new StatisticsView();
					$this.$('#context-content').html(statisticsView.render().el);
			break;
		}
	},

	close: function(event){
		var $this = this;

		//$this.$el.fadeOut(250, function(){
			$this.destroy();
		//});
	}

});
