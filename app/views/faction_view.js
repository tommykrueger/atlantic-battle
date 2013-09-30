var View = require('./view');

module.exports = View.extend({
  className : 'faction',
  template: require('./templates/faction'),

 	events: {
    'mouseenter': 'showInfo',
    'click path.ship': 'showInfo'
  },

  initialize: function(options){
		this.model = this.options.factionPath;

		_.bindAll(this, 'showInfo', 'hideInfo');
	},

	render: function(){
		var $this = this;
	 
    // append the faction path to the map
		var g = d3.select('.factions')
      .append('path')
      .attr('id', 'faction-path-' + $this.model.get('id'))
      .attr('d', $this.model.get('d'))
      .attr('class', 'faction-path ' + $this.model.get('faction') )
      .attr('title', $this.model.get('name'))
      .attr('rel', 'faction-path-' + $this.model.get('id')) 
      .attr('faction', $this.model.get('faction')) 
      .on('mouseenter', $this.mouseenter)
      .on('mouseout', $this.mouseout)
      .on('mousemove', $this.mousemove);
	},

	mouseenter: function(elem){
    var factionName = d3.select(this).attr('faction');

    $('#tooltip #tooltip-content').html( factionName.toUpperCase() + ' Faction Border' );

    $('#tooltip').css({
      'left': d3.event.pageX + 24,
      'top': d3.event.pageY + 24
    });
    $('#tooltip').stop().fadeIn(24);
  },

  mouseout: function(elem){
    $('#tooltip').stop().fadeOut(24);
  },

  mousemove: function(elem){
    $('#tooltip').css({
      'left': d3.event.pageX + 24,
      'top': d3.event.pageY + 24
    });
  },

	showInfo: function(){
		console.log('showing info');
		var $this = this;

		var tooltip = new TooltipView({ data: $this.model, SVGObject: $this });
				tooltip.render();
	},

	hideInfo: function(){
		console.log('hiding info');
	}


});
