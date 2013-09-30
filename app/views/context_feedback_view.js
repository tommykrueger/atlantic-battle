var View = require('./view');

module.exports = View.extend({
  id: 'feedback',
  template: require('./templates/context_feedback'),

 	events: {
    'click #submit-btn': 'submitForm'
  },

  initialize: function(options){
		_.bindAll(this, 'submitForm');
		console.log('render feedback view');
	},

	submitForm: function(event){
		event.preventDefault();

		var formData = $('#feedback-form').serialize();

		$('#form-process').text('Sending... ').fadeIn(250);

		$.ajax({
		  //url: 'http://localhost/atlantic-battle/server/backend/events/send_email',
		  url: 'http://tommykrueger.com/projects/atlantic-battle/server/backend/events/send_email',
		  type: 'POST',
		  data: formData,
		  success: function(data) {
				$('#form-process').text(data).delay(2500).fadeOut(250);
      }
		});
	}

});
