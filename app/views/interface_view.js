var View = require('./view');
var ContextView = require('./context_view');

module.exports = View.extend({
  id : '',
  template: require('./templates/interface'),

	events: {
		'click #close-btn': 'closeProvinceView',
		'click a.ship-link': 'openShipDialog',
		'click #mainmenu li': 'showScreen',

		'click #filter-list li': 'filterMap',
		'click #pause-btn': 'pauseGame'
  },

  initialize: function(options){
		this.game = this.options.game;
		this.worldmap = this.options.worldmap;

		_.bindAll(this, 'showScreen', 'pauseGame');

		/*
		this.ship_types = [
			'CV': 'Aircraft Carrier',
			'CVL': 'Light Aircraft Carrier'
		];
		*/
	},

	openShipDialog: function(event){
		event.preventDefault();
	},

	closeProvinceView: function(){
		this.destroy();
	},

	// open up a screen for the current context
	showScreen: function(e){

		var context = $(e.target).attr('id');

		// move camera to point
		if(context == 'goto'){
			
			this.worldmap.moveTo(-3500, -1700);
		}else{

			contextView = new ContextView({context: context});
			$('#context-view').remove();
			$('body').append(contextView.render().el);
		}
	},

	// toggle the filter
	filterMap: function(e){
		e.preventDefault();

		var $el = $(e.target);
		var filter = $el.attr('id');

		switch(filter){
			case 'filter-borders':
				console.log(filter, 'hiding borders');
				d3.selectAll('.borders').classed('hidden');
				break;

			case 'filter-air-zones':

				var status = $el.attr('class')
				if(status == 'active') {
					d3.selectAll('.air-zone').classed('hidden', false);
					$el.attr('class', '');
				}
				else {
					d3.selectAll('.air-zone').classed('hidden', true);
					$el.attr('class', 'active');
				}

				break;

			case 'filter-submarine-zones':

				var status = $el.attr('class')
				if(status == 'active') {
					d3.selectAll('.submarine-zone').classed('hidden', false);
					$el.attr('class', '');
				}
				else {
					d3.selectAll('.submarine-zone').classed('hidden', true);
					$el.attr('class', 'active');
				}

				break;

			case 'filter-convoy-routes':

				var status = $el.attr('class')
				if(status == 'active') {
					d3.selectAll('.convoy-route').classed('hidden', false);
					$el.attr('class', '');
				}
				else {
					d3.selectAll('.convoy-route').classed('hidden', true);
					$el.attr('class', 'active');
				}

				break;

			case 'filter-event':

				var path_old = d3.select('#path2');
				var path_new = d3.select('#path5').attr('d');

				//console.log(path);

				path_old.transition().duration(5000).attr('d', path_new);

				break;

			case 'filter-fullscreen':
				this.toggleFullScreen();
				break;
		}
		
	},

	// source: https://developer.mozilla.org/samples/domref/fullscreen.html
	toggleFullScreen: function() {
	  
		var element = document.getElementById("body");

	  // firefox and chrome
		if(!document.mozFullScreen && !document.webkitFullScreen) {
      if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      }
      else{
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } 
    else{
      if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } 
      else{
        document.webkitCancelFullScreen();
      }
    }
  },

  pauseGame: function(event){
  	event.preventDefault();

  	console.log('pause clicked');

  	if(!$(event.target).hasClass('paused')) {
  		clearInterval(this.game.gameLoopInterval);
  		$(event.target).addClass('paused');
  	}
  	else{
  		this.game.gameLoopInterval = setInterval(this.game.gameIntervalFunction, 1000);
  		$(event.target).removeClass('paused');
  	}
  }

});
