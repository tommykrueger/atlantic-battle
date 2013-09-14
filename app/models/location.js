var Model = require('./model');

module.exports = Model.extend({
	
	defaults: {

		id: null,
		name: '',
		type: 'city',
		x: 0,
		y: 0

	},

	intitialize : function(values){
		Model.prototype.initialize.call(this, values);
	}

});