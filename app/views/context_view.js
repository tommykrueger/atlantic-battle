var View = require('./view');
var ContextUnitsView = require('./context_units_view');
var ContextEventsView = require('./context_events_view');
var ContextDiplomacyView = require('./context_diplomacy_view');
var ContextStatisticsView = require('./context_statistics_view');
var ContextFeedbackView = require('./context_feedback_view');

module.exports = View.extend({
  id: 'context-view',
  template: require('./templates/context'),

 	events: {
    'click .close-btn': 'close'
  },

  initialize: function(options){
		this.context = this.options.context;
		this.worldmap = this.options.worldmap;

		_.bindAll(this, 'setContext', 'render', 'afterRender', 'close');
	},

	afterRender: function(){
		this.setContext();
	},

	setContext: function(){
		var $this = this;

		switch(this.context){
			case 'units':

				var contextUnitsView = new ContextUnitsView();
				$this.$('#context-content').html(contextUnitsView.render().el);
			break;
			case 'events':

				var contextEventsView = new ContextEventsView();
				$this.$('#context-content').html(contextEventsView.render().el);
			break;
			case 'diplomacy':

				var contextDiplomacyView = new ContextDiplomacyView();
				$this.$('#context-content').html(contextDiplomacyView.render().el);
			break;
			case 'feedback':

				var contextFeedbackView = new ContextFeedbackView();
				$this.$('#context-content').html(contextFeedbackView.render().el);
			break;
			case 'statistics':

				var contextStatisticsView = new ContextStatisticsView();
				$this.$('#context-content').html(contextStatisticsView.render().el);
			break;
		}
	},

	close: function(event){
		var $this = this;
		$this.destroy();
	}
});
