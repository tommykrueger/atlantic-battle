var View = require('./view');
var TooltipView = require('./tooltip_view');

module.exports = View.extend({
  className : 'sunken-ship',
  template: require('./templates/sunken_ship'),

 	events: {
    'mouseenter': 'showInfo',
    'click circle.sunken-ship': 'showInfo'
  },

  initialize: function(options){
		this.model = this.options.ship;

		_.bindAll(this, 'showInfo', 'hideInfo');
	},

	render: function(){
		var $this = this;
	
		// append the description text to the body as html
		d3.select('.plot').append('circle')
			.on('mouseover', $this.showInfo)
      .on('mouseout', $this.hideInfo)
			.style('opacity', 0)
			.transition()
			.duration(1500)
			.style('opacity', 1.0)
      .attr('r', 2)
      .attr('cx', $this.model.get('x'))
      .attr('cy', $this.model.get('y'))
      .attr('class', function(){
      	return 'sunken-ship ' + $this.model.get('country');
      })
      .attr('title', $this.model.get('name'))
      .attr('rel', $this.model.get('id'));


     d3.select('.plot').append('circle')
     	.attr('class', 'explosion')
     	.attr('r', 1)
     	.attr('cx', $this.model.get('x'))
     	.attr('cy', $this.model.get('y'))
     	.transition()
     	.duration(600)
     	.attr('r', 32)
     	.style('opacity', 0.0)
     	.remove();	 
			
		// add sunken ship report to the list
		$('#sunk-reports').append($this.template);      
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
