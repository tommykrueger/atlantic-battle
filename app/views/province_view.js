var View = require('./view');

module.exports = View.extend({
  className : 'province',
  template: require('./templates/province'),

 	events: {
    'click #close-btn': 'closeProvinceView',
    'click a.ship-link': 'openShipDialog'
  },

  initialize: function(options){
		this.provinceID = this.options.provinceID;

		$('body .province').remove();

		console.log('opening province:', this.provinceID);
	},

	render: function(){
		var $this = this;

		var province = _PROVINCES[this.provinceID];
		var province_fleets = new Array();

		// add fleets to the province
		_.each(_FLEETS, function(fleet){
			if(fleet.province == $this.provinceID)
				province_fleets.push(fleet);
		});

		province.fleets = province_fleets;

		console.log(province);
		console.log(province_fleets);


		this.$el.html(this.template(province));
		$('body').append(this.$el);

		return this.$el;
	},

	openShipDialog: function(event){
		event.preventDefault();
		console.log(event);
	},

	closeProvinceView: function(){
		this.destroy();
	}

});
