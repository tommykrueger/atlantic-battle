var View = require('./view');
var ProvinceView = require('./province_view');

module.exports = View.extend({
  id: 'worldmap',
  template: require('./templates/worldmap'),

  initialize: function(options){
    this.model = options.provinces;
    this.borders = options.borders;
    this.locations = options.locations;
    this.fleets = options.fleets;

    this.fleetImages = [];

    _.bindAll(this, 'redraw', 'afterRender', 'moveTo');

    // define global world map settings
    this.worldmapSettings = {
      width: 8192, //$(window).width(),
      height: 6061, //$(window).height(),

      startOffsetX: -3000,
      startOffsetY: -1600,

      colors: {
        bg: '#D0E5F2',
        grid: '#b0b0b0',

        country: '#ffffff',
        borders: '#ff6060'
      }
    };

    // render the svg worldmap holder
    this.worldmapSVG = d3.select("body").append("svg")
      .attr("width", this.worldmapSettings.width)
      .attr("height", this.worldmapSettings.height);

    this.plot = this.worldmapSVG.append('g')
      .attr('class', 'plot');

    this.zoom = d3.behavior.zoom().scaleExtent([1,8]).on("zoom", this.redraw);
    this.worldmapSVG.call(this.zoom); 

    //d3.select('.plot').attr('transform', "translate("+ this.worldmapSettings.startOffsetX +", "+ this.worldmapSettings.startOffsetY +") scale(1,1)");
  },

  redraw: function(){

    //console.log(d3.event);

    var translation = d3.event.translate,
        newx = translation[0];// + this.worldmapSettings.startOffsetX,
        newy = translation[1];// + this.worldmapSettings.startOffsetY;

    d3.select('.plot')
      .transition()
      .attr('transform', "translate("+ newx +", "+ newy +")" + " scale(" + d3.event.scale + ")")
      .duration(50);

    // resize the fleet images
    /*
    $.each(this.fleetImages, function(idx, fleetImage){
      var width = fleetImage.attr('width');
      var height = fleetImage.attr('height');

      var newWidth = width * d3.event.scale;
      var newHeight = height * d3.event.scale;

      fleetImage.attr('width', newWidth);
      fleetImage.attr('height', newHeight);

      console.log(width);
    });
    */
  },

  getRenderData: function(){
  	return { };
  },

  render: function(){
    var $this = this;

    // render the world map json data to svg path objects
    $this.model.each(function(country, index){

      var g = $this.plot.append('g');
          
      var country = g.append('path')
            .attr('id', country.get('id'))
            .attr('class', 'province')
            .attr('d', country.get('path'))
            .attr('fill', $this.worldmapSettings.colors.country)
            .attr('title', country.get('id'))
            .on('mouseover', $this.provinceMouseover)
            .on('mouseout', $this.provinceMouseout)
            .on('click', $this.provinceClicked);

       // add the title
        //country
          //.append('title')
          //.text(country.get('id'));

    });

    var $borders = $this.plot.append('g').attr('class', 'borders');

    $this.borders.each(function(border, index){
      //console.log(border);

      $borders.append('path')
        .attr('id', 'path' + border.get('id'))
        .attr('class', 'border')
        .attr('d', border.get('path'))
        .attr('stroke', $this.worldmapSettings.colors.borders);

    });

    // render the locations
    var $locations = $this.plot.append('g').attr('class', 'locations');

    $this.locations.each(function(location, index){
      //console.log(location);

      $locations.append('circle')
        .attr('id', location.get('name'))
        .attr('class', 'location')
        .attr('r', 0.8)
        .attr('cx', location.get('x'))
        .attr('cy', location.get('y'))
        .attr('fill', $this.worldmapSettings.colors.borders);

    });


    // render the fleets
    //console.log($this.fleets);
    $this.fleets.each(function(fleet, index){

      // check if fleet has date in the past
      var positions = fleet.get('positions');
      var startDate = positions[0];

      if(startDate){

        // render object on map
        var fleetImage = $this.plot.append('image')
          .attr("xlink:href", "img/units/heavy_cruiser.svg")
          .attr("x", positions[1][0])
          .attr("y", positions[1][1])
          .attr("width", 64)
          .attr("height", 17);

        $this.fleetImages.push(fleetImage);
      }

      //console.log(startDate);
      //console.log(fleet);

    });

  	return this.$el;
  },

  provinceMouseover: function(elem){
    //d3.select(this).attr('fill', '#898899');

    //var title = d3.select(this).attr('title');
    //console.log(title);

    // get the intersection of the border paths

    //var el = d3.select(this).node().getPointAtLength(500);
    //console.log(el);

    //@TODO show tooltip with province name next to the mouse
  },

  provinceMouseout: function(elem){
    d3.select(this).attr('fill', '#fff');
  },

  // Open the dialog to see what is inside this province
  provinceClicked: function(elem){
    //console.log(this);

    //@TODO open province details

    //var provinceView = new ProvinceView({ provinceID: this.id });
    //provinceView.render();
  },

  afterRender: function(){
    var $this = this;
  },

  // move the viewport to a certain location
  moveTo: function(x, y){

    x = parseInt(x);
    y = parseInt(y);

    this.zoom.translate([x, y]);
    this.zoom.scale(4);

    this.plot
      .transition()
      .duration(800)
      .attr("transform", "translate(" +  (x + ((8192 - (8192 * 1))/2)) + ',' + (y + ((6061 - (6061 * 1))/2)) + ")scale(" + 4*1 + ")");  

  }

});
