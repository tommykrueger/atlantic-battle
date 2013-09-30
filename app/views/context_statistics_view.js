var View = require('./view');

module.exports = View.extend({
  id: 'statistics',
  template: require('./templates/context_statistics'),

 	events: {
    'click #statistics-menu li': 'switchStatistic'
  },

  initialize: function(options){
		//this.worldmap = this.options.worldmap;

		this.plot = '#graph-plot';
		this.SVGplot;

		// 1. submarines / destroyers

		this.data = [
			{
				'1938': [23],
				'1939': [34],
				'1940': [46],
				'1941': [78]
				
			},
			{
				'1938': [7],
				'1939': [12],
				'1940': [13],
				'1941': [25]
			}
		];


		this.sunkSubs = [
			[1939, 9],
			[1940, 23],
			[1941, 35],
			[1942, 86],
			[1943, 236],
			[1944, 235],
			[1945, 122]
		];

		// sunk ships in the atlantic
		// year / sunk ships / sunk ships by submarines / sunk germany submarines

		// source http://www.world-war-2.info/statistics/
		this.sunkShips = [
			[1939, 222, 114, 9],
			[1940, 1059, 471, 23],
			[1941, 1299, 432, 35],
			[1942, 1664, 1160, 86],
			[1943, 597, 377, 236],
			[1944, 205, 132, 235],
			[1945, 104, 56, 122]
		];

		console.log('loading statistics view');
		_.bindAll(this, 'afterRender', 'switchStatistic', 'renderSubmarineLosses', 'renderStatisticPlot');
	},

	afterRender: function(){
		this.renderStatisticPlot();
	},

	// render the D3 graph plot
	switchStatistic: function(event){
		var currentStatistic = $(event.target).attr('id');

		console.log(currentStatistic);

		switch(currentStatistic){
			case 'submarine-losses':
				this.renderSubmarineLosses();
				break;
		}
	},

	renderSubmarineLosses: function(){
		var $this = this;

		$('#graph-plot').empty();
		$('#plot').empty();

		d3.csv('data/submarine-losses.csv', function(data) {
		  //data = JSON.stringify(data);

		  var h = 400;

		  $this.SVGplot = d3.select('#plot')
				.append('svg')
				.attr('width', 720)
				.attr('height', 520)
					.append('g')
					.attr('transform', 'translate(48,48)');

			var x = d3.scale.linear().domain([1939, 1945]).range([0, 580]);
			var y = d3.scale.linear().domain([0, 50]).range([400, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom')
				.ticks(7)
				.tickFormat(d3.format('.0f'));

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left')
				.ticks(10);

			y.domain([0, d3.max(data, function(d){ return d['Ships']; })]);


			$this.SVGplot.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(48, 424)')
				.call(xAxis);

			$this.SVGplot.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate(24, 0)')
				.call(yAxis)
					.append('text')
					.attr('transform', 'translate(-64, 0) rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text('Sunk Ships per year (Atlantic)');

			$this.SVGplot.selectAll('rect')
     		.data(data)
   			.enter()
   				.append('rect')
   				.attr('fill', 'steelblue')
     			.attr('x', function(d, i) { 
     				console.log(d);
     				return x(d.year); 
     			})
     			.attr('y', function(d) { 
     				return h - y(d['Ships']) - .5;
     			})
     			.attr('width', 24)
     			.attr('height', function(d) {
     				return y(d['Ships']); 
     			});

			$this.$('#graph-plot').html( $('#plot').html() );

		});
	},

	renderStatisticPlot: function(){

		console.log('rendering plot');
		$('#graph-plot').empty();
		$('#plot').empty();

		this.SVGplot = d3.select('#plot')
			.append('svg')
			.attr('width', 720)
			.attr('height', 520)
				.append('g')
				.attr('transform', 'translate(48,48)');

		var x = d3.scale.linear().domain([1939, 1945]).range([0, 580]);
		var y = d3.scale.linear().domain([0, 50]).range([400, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom')
			.ticks(7)
			.tickFormat(d3.format('.0f'));

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left')
			.ticks(12);

		var line = d3.svg.line()
			.interpolate('cardinal')
			.x(function(d) { return x(d[0]); })
			.y(function(d) { return y(d[1]); });

		var lineSubs = d3.svg.line()
			.interpolate('cardinal')
			.x(function(d) { return x(d[0]); })
			.y(function(d) { return y(d[2]); });

		var lineSubsSunk = d3.svg.line()
			.interpolate('cardinal')
			.x(function(d) { return x(d[0]); })
			.y(function(d) { return y(d[3]); });

		//x.domain(d3.extent(this.sunkShips, function(d) { return d[0]; }));
		y.domain([0, d3.max(this.sunkShips, function(d) { return d[1]; })]);

		this.SVGplot.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(48, 424)')
				.call(xAxis);

		this.SVGplot.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate(24, 0)')
				.call(yAxis)
					.append('text')
					.attr('transform', 'translate(-64, 0) rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text('Sunk Ships per year (Atlantic)');

		var graph = this.SVGplot.selectAll('.line-graph')
				.data(this.sunkShips[0])
				.enter()
				.append('g')
				.attr('class', 'sunk-line-graph');

		graph.append('path')
				.attr('class', 'line sunk-ships-line')
				.attr('transform', 'translate(48,0)')
				.attr('d', line(this.sunkShips));

		graph.append('path')
			.attr('class', 'line sunk-ships-submarine-line')
			.attr('transform', 'translate(48,0)')
			.attr('d', lineSubs(this.sunkShips));

		graph.append('path')
			.attr('class', 'line sunk-submarines-line')
			.attr('transform', 'translate(48,0)')
			.attr('d', lineSubsSunk(this.sunkShips));


		// add the dots
		graph
			.append('g')
			.attr('class', 'circles')
			.attr('transform', 'translate(48,0)')
			.selectAll('circle')
			.data( this.sunkShips )
			.enter()
			.append('circle')
				.attr('class', 'amount amount-sunk-ships')
				.attr('r', 4)
				.attr('cx', function(d){
					return x(d[0]);
				})
				.attr('cy', function(d){
					return y(d[1]);
				});

		graph
			.append('g')
			.attr('class', 'circles')
			.attr('transform', 'translate(48,0)')
			.selectAll('circle')
			.data( this.sunkShips )
			.enter()
			.append('circle')
				.attr('class', 'amount amount-sunk-ships-submarine')
				.attr('r', 4)
				.attr('cx', function(d){
					return x(d[0]);
				})
				.attr('cy', function(d){
					return y(d[2]);
				});

		graph
			.append('g')
			.attr('class', 'circles')
			.attr('transform', 'translate(48,0)')
			.selectAll('circle')
			.data( this.sunkShips )
			.enter()
			.append('circle')
				.attr('class', 'amount amount-sunk-submarines')
				.attr('r', 4)
				.attr('cx', function(d){
					return x(d[0]);
				})
				.attr('cy', function(d){
					return y(d[3]);
				});



		var labels = this.SVGplot
			.append('g')
			.attr('class', 'labels')
			.attr('transform', 'translate(460, 48)');

			labels
				.append('text')
					.text('Total ships losses (Allies)')
					.attr('fill', 'steelblue');

			labels
				.append('text')	
					.text('Ship losses by submarines (Allies)')
					.attr('fill', 'red')
					.attr('transform', 'translate(0, 24)');

			labels
				.append('text')	
					.text('Submarine losses (Axis)')
					.attr('fill', 'green')
					.attr('transform', 'translate(0, 48)');


		this.$('#graph-plot').html( $('#plot').html() );

	}

});
