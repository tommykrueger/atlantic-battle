var View = require('./view');
var TooltipView = require('./tooltip_view');

module.exports = View.extend({
  className : 'ship',
  template: require('./templates/ship'),

 	events: {
    'mouseenter': 'showInfo',
    'click circle.ship': 'showInfo'
  },

  initialize: function(options){
		this.model = this.options.ship;
    this.worldmap = this.options.worldmap;

		_.bindAll(this, 'showInfo', 'hideInfo');
	},

	render: function(){
		var $this = this;
	
		// append the description text to the body as html
		var g = d3.select('.ships')
      .append('g')
      .attr('class', function(){
        return 'ship-' + $this.model.get('id') + ' locale-' + $this.model.get('locale') + ' country-' + $this.model.get('country') + ' ship-class-' + $this.model.get('ship_class') + ' ship-type-' + $this.model.get('ship_type'); 

      })
      .attr('title', $this.model.get('name'))
      .attr('rel', 'ship-' + $this.model.get('id')) 
      .attr('width', 2)
      .attr('height', 2)
      .on('click', $this.shipMouseenter)
      .on('mouseenter', $this.shipMouseenter)
      .on('mouseout', $this.shipMouseout)
      .on('mousemove', $this.shipMousemove)
      .attr('transform', 'translate('+ $this.worldmap.projection([$this.model.get('y'), $this.model.get('x')]) +')');

    g.append('circle')
      .attr('r', 1.4)
      .style('opacity', 0)
      .transition()
      .duration(1500)
      .style('opacity', 1.0)
      .attr('class', function(){
      	return 'ship ' + $this.model.get('locale');
      });

    g.append('circle')
     	.attr('class', 'explosion')
     	.attr('r', 1)
     	.transition()
     	.duration(1200)
     	.attr('r', 48)
     	.style('opacity', 0.0)
     	.remove();	 
			
		// add sunken ship report to the list
		$('#sunk-reports').append($this.template( $this.model.toJSON() ));      
	},

	shipMouseenter: function(elem){
    var relatedEl = d3.select(this).attr('rel');

    $('#tooltip #tooltip-content').html( $('#' + relatedEl).html() );
    $('#tooltip').addClass('tooltip-ship');

    //check position
    
    $('#tooltip').css({
      'left': d3.event.pageX - 120,
      'top': d3.event.pageY - $('#tooltip').outerHeight() - 32
    });
    $('#tooltip').stop().fadeIn(0);
  },

  shipMouseout: function(elem){
    $('#tooltip').stop().fadeOut(0, function(){ $(this).removeClass('tooltip-ship'); });
  },

  shipMousemove: function(elem){
    $('#tooltip').css({
      'left': d3.event.pageX - 120,
      'top': d3.event.pageY - $('#tooltip').outerHeight() - 32
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
