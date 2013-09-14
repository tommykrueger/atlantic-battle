var Model = require('./model');

module.exports = Model.extend({
	
	defaults: {

		id: null,
		name: ''

	},

	intitialize : function(values){
		Model.prototype.initialize.call(this, values);
	}

});