var View = require('./view');
var Game = require('./game_view');

module.exports = View.extend({
  className : 'dialog',
  template: require('./templates/dialog'),

 	events: {
    'click .submit-btn': 'submitDialog',
    'click .save-btn': 'saveDialog',
    'click .cancel-btn': 'cancelDialog',
    'click .close-dialog-btn': 'closeDialog'
  },

  initialize: function(options){
		this.direction = this.options.direction;

		this.headline = this.options.headline;
		this.description = this.options.description;

		this.buttons = {
			submit: this.options.submit,
			save: this.options.save,
			cancel: this.options.cancel
		};

		this.dialogOptions = [];

		this.game = this.options.game;
		// remove existing dialog from screen
		//$('body .dialog').remove();
	},

	getRenderData: function() {
    return {
    	headline: this.headline,
    	description: this.description,
    	buttons: this.buttons
    };
  },

	submitDialog: function(event){
		event.preventDefault();

		if($(event.target).attr('rel') == 'start-game'){
			console.log('starting the game loop');
			this.game.render();
		}

		this.destroy();
	},

	saveDialog: function(event){
		console.log('save dialog');
		event.preventDefault();
	},

	cancelDialog: function(event){
		console.log('cancel dialog');
		event.preventDefault();
	},

	closeDialog: function(event){
		console.log('closing dialog');
		this.destroy();
	}

});
