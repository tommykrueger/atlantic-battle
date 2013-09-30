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
    this.submarineZones = options.submarineZones;
    this.alliedAirZones = options.alliedAirZones;
    this.convoyRoutes = options.convoyRoutes;

    this.submarineZonesPaths = [];
     
    this.fleetImages = [];

    // start-date | end-date
    this.submarineZoneDates = [
      ['z-1', '1939-09-01', '1940-03-01', 'German Submarine activity <br/><i>(Sep 1939 - Mar 1940)</i>'],
      ['z-2', '1940-03-01', '1940-09-01', 'German Submarine activity <br/><i>(Mar 1940 - Sep 1940)</i>'],
      
      ['z-3', '1940-09-01', '1941-03-01', 'German Submarine activity <br/><i>(Sep 1940 - Mar 1941)</i>'],
      ['z-4', '1940-09-01', '1941-03-01', 'German Submarine activity <br/><i>(Sep 1940 - Mar 1941)</i>'],
      
      ['z-5', '1941-03-01', '1941-09-01', 'German Submarine activity <br/><i>(Mar 1941 - Sep 1941)</i>'],
      ['z-6', '1941-03-01', '1941-09-01', 'German Submarine activity <br/><i>(Mar 1941 - Sep 1941)</i>'],

      ['z-7', '1941-09-01', '1942-03-01', 'German Submarine activity <br/><i>(Sep 1941 - Mar 1942)</i>'],

      ['z-8', '1942-03-01', '1942-09-01', 'German Submarine activity <br/><i>(Mar 1942 - Sep 1942)</i>'],
      ['z-9', '1942-03-01', '1942-09-01', 'German Submarine activity <br/><i>(Mar 1942 - Sep 1942)</i>'],

      ['z-10', '1942-09-01', '1943-06-01', 'German Submarine activity <br/><i>(Sep 1942 - May 1943)</i>'],
      ['z-11', '1942-09-01', '1943-06-01', 'German Submarine activity <br/><i>(Sep 1942 - May 1943)</i>'],
      ['z-12', '1942-09-01', '1943-06-01', 'German Submarine activity <br/><i>(Sep 1942 - May 1943)</i>'],

      ['z-13', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>'],
      ['z-14', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>'],
      ['z-15', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>'],
      ['z-16', '1943-06-01', '1945-05-08', 'German Submarine activity <br/><i>(June 1943 - April 1945)</i>']
    ];


    _.bindAll(this, 'redraw', 'afterRender', 'moveTo', 'markPosition');

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

    this.plot = this.worldmapSVG.append('g').attr('class', 'plot');

    // add svg g objects for svg ordering
    this.countriesSVG = this.plot.append('g').attr('class', 'countries');
    this.bordersSVG = this.plot.append('g').attr('class', 'borders');
    this.fationsSVG = this.plot.append('g').attr('class', 'factions');
    this.submarineZonesSVG = this.plot.append('g').attr('class', 'submarine-zones');
    this.airZonesSVG = this.plot.append('g').attr('class', 'air-zones');
    this.convoyRoutesSVG = this.plot.append('g').attr('class', 'convoy-routes');
    this.locationsSVG = this.plot.append('g').attr('class', 'locations');
    this.shipsSVG = this.plot.append('g').attr('class', 'ships');
 

    this.zoom = d3.behavior.zoom().scaleExtent([1,12]).on("zoom", this.redraw);
    this.worldmapSVG.call(this.zoom); 


    // our map is a miller projection so we need to convert the lat / long to miller appropriate positions
    // http://bl.ocks.org/mbostock/3734333
    // http://commons.wikimedia.org/wiki/File:Blank_map_world_gmt_(more_simplified).svg
    this.projection = d3.geo.miller()
      .scale((2270 + 1) / 2 / Math.PI)
      .translate([2270 / 2 + -2.8, 1666 / 2 + 53])
      .precision(.1);
  },

  redraw: function(){

    var translation = d3.event.translate,
        newx = translation[0];
        newy = translation[1];

    d3.select('.plot')
      .transition()
      .attr('transform', "translate("+ newx +", "+ newy +")" + " scale(" + d3.event.scale + ")")
      .duration(50);
  },

  getRenderData: function(){
  	return { };
  },

  render: function(){
    var $this = this;
    
    // render the world map json data to svg path objects
    $this.model.each(function(country, index){

      var country = $this.countriesSVG
            .append('path')
            .attr('id', country.get('id'))
            .attr('class', 'province')
            .attr('rel', country.get('rel'))
            .attr('d', country.get('path'))
            .attr('fill', $this.worldmapSettings.colors.country)
            .attr('title', country.get('id'))
            .on('mouseenter', $this.provinceMouseover)
            .on('mouseout', $this.provinceMouseout)
            .on('mousemove', $this.provinceMousemove)
            .on('click', $this.provinceClicked);
    });


    /*
    $this.borders.each(function(border, index){

      $this.bordersSVG
        .append('path')
        .attr('id', 'path' + border.get('id'))
        .attr('class', 'border')
        .attr('d', border.get('path'));

    });
    */

    // render the locations
    $this.locations.each(function(location, index){

      if(location.get('location_type') == 'capital'){
        $this.locationsSVG
          .append('image')
          .attr("xlink:href", "img/map/star.svg")
          .attr('id', location.get('name'))
          .attr('class', 'location capital')
          .attr('width', 1.4)
          .attr('height', 1.4)
          .attr('transform', function(){
            return "translate(" + $this.projection([location.get('y'), location.get('x')]) + ")";  
          });
      }
      else{
        $this.locationsSVG
          .append('rect')
          .attr('id', location.get('name'))
          .attr('class', 'location')
          .attr('width', 0.8)
          .attr('height', 0.8)
          .attr('transform', function(){
            return "translate(" + $this.projection([location.get('y'), location.get('x')]) + ")";  
          })
          .attr('fill', $this.worldmapSettings.colors.borders);
      }
    });



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

    });


    // render submarine zones
    _.each(this.submarineZones.models, function(zone, idx){ 
      var startDate = null;
      var endDate = null;

      var path = $this.submarineZonesSVG
        .append('path')
          .attr('id', zone.get('id'))
          .attr('rel', zone.get('rel'))
          .attr('title', function(d, i){ 

            // find the date from the list
            var p = null;
            _.each($this.submarineZoneDates, function(date, zoneIdx){

              var d = date[0].toString();
              if(d == zone.get('rel')){
                p = date[3];
              }
                
            });

            return p;
          })
          .attr('class', 'submarine-zone inactive')
          .attr('start_date', function(d, i){ 

            // find the date from the list
            var p = null;
            _.each($this.submarineZoneDates, function(date, zoneIdx){

              var d = date[0].toString();
              if(d == zone.get('rel')){
                startDate = date[1];
                p = date[1];
              }
                
            });

            return p;
          })
          .attr('end_date', function(d, i){
           // find the date from the list
            var p = null;
            _.each($this.submarineZoneDates, function(date, zoneIdx){

              var d = date[0].toString();
              if(d == zone.get('rel')){
                endDate = date[2];
                p = date[2];
              }
                
            });

            return p;
          })
          .attr('d', zone.get('d'))
          .on('mouseenter', function(d, i){

            $('#tooltip #tooltip-content').html( d3.select(this).attr('title') );

            $('#tooltip').css({
              'left': d3.event.pageX + 24,
              'top': d3.event.pageY + 24
            });
            
            $('#tooltip').stop().fadeIn(24);
          })
          .on('mouseout', $this.provinceMouseout)
          .on('mousemove', $this.provinceMousemove);

        var obj = [
          path, 
          startDate, 
          endDate
        ];  

        $this.submarineZonesPaths.push(obj);
    });


    $this.alliedAirZones.each(function(zone, index){

      // render object on map
      $this.airZonesSVG
        .append('circle')
          .attr('class', 'air-zone hidden')
          .attr('r', zone.get('r'))
          .attr('cx', zone.get('cx'))
          .attr('cy', zone.get('cy'))
          .on('mouseenter', $this.provinceMouseover)
          .on('mousemove', $this.provinceMousemove)
          .on('mouseout', $this.provinceMouseout);

    });

    $this.convoyRoutes.each(function(route, index){

      // render object on map
      var convoyRoute = 
        $this.convoyRoutesSVG
          .append('path')
            .attr('class', 'convoy-route')
            .attr('d', route.get('d'))
            .attr('rel', route.get('rel'))
            .on('mouseenter', $this.provinceMouseover)
            .on('mousemove', $this.provinceMousemove)
            .on('mouseout', $this.provinceMouseout);

      // add animation
      var convoyNode = convoyRoute.node();
      var convoyLength = convoyNode.getTotalLength();

      /*
      var circle = $this.plot.append("circle")
        .attr({
          r: 2,
          fill: '#f33',
            transform: function () {
                var p = convoyNode.getPointAtLength(0);
                return "translate(" + [p.x, p.y] + ")";
            }
        });

      circle.transition()
        .duration(100000)
        .ease("linear")
        .attrTween("transform", function (d, i) {
          return function (t) {
              var p = convoyNode.getPointAtLength(convoyLength*t);
              return "translate(" + [p.x, p.y] + ")";
          }
      });
    */

    });

  	return this.$el;
  },

  provinceMouseover: function(elem){
    //console.log(this);
    var name = d3.select(this).attr('rel');

    console.log(name);

    $('#tooltip #tooltip-content').html(name);

    $('#tooltip').css({
      'left': d3.event.pageX + 24,
      'top': d3.event.pageY + 24
    });
    $('#tooltip').stop().fadeIn(24);

    //var title = d3.select(this).attr('title');
    //console.log(title);

    // get the intersection of the border paths

    //var el = d3.select(this).node().getPointAtLength(500);
    //console.log(el);

    //@TODO show tooltip with province name next to the mouse
  },

  provinceMouseout: function(elem){
    $('#tooltip').stop().fadeOut(24);
  },

  provinceMousemove: function(elem){
    $('#tooltip').css({
      'left': d3.event.pageX + 24,
      'top': d3.event.pageY + 24
    });
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

    zoomLevel = 5;

    var trans = this.projection([y, x]);
    trans[0] = - ( (trans[0] * zoomLevel) - $(window).width() / 2);
    trans[1] = - ( (trans[1] * zoomLevel) - $(window).height() / 2);

    this.zoom.translate([trans[0], trans[1]]);
    this.zoom.scale( zoomLevel );

    this.plot
      .transition()
      .duration(1200)
      .attr("transform", "translate("+ trans +")scale(" + zoomLevel + ")");  
  },

  // mark the position on the map
  markPosition: function(x, y){
    var $this = this;

    d3.select('.plot').append('circle')
      .attr('class', 'explosion')
      .attr('r', 1)
      .attr('cx', 0.7)
      .attr('cy', 0.7)
      .attr('transform', function(){
        return "translate(" + $this.projection([y, x]) + ")";  
      })
      .attr('stroke', '#999')
      .transition()
      .duration(1000)
      .attr('r', 16)
      .style('opacity', 0.1)
      .remove();   
  }

});
