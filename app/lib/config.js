/**
 * CONFIG file for
 *  
 * Add configuration of the app here
 */

var View = require('views/view');

module.exports = View.extend({
  template: false,

  initialize: function(){
		
		// add configuration vars to the window variable to enable app wide access
		window.app_config = {

			// worldmap

			// submarine zones
			submarineZoneDates: [
		    ['01', '1939-09-01', '1940-03-01', 'German Submarine activity (Sep 1939 - Mar 1940)'],
		    ['02', '1940-03-01', '1940-09-01', 'German Submarine activity (Mar 1940 - Sep 1940)'],
		    
		    ['03', '1940-09-01', '1941-03-01', 'German Submarine activity (Sep 1940 - Mar 1941)'],
		    ['03-01', '1940-09-01', '1941-03-01', 'German Submarine activity (Sep 1940 - Mar 1941)'],
		    
		    ['04', '1941-03-01', '1941-09-01', 'German Submarine activity (Mar 1941 - Sep 1941)'],
		    ['04-01', '1941-03-01', '1941-09-01', 'German Submarine activity (Mar 1941 - Sep 1941)'],

		    ['05', '1941-09-01', '1942-03-01', 'German Submarine activity (Sep 1941 - Mar 1942)'],

		    ['06', '1942-03-01', '1942-09-01', 'German Submarine activity (Mar 1942 - Sep 1942)'],
		    ['06-01', '1942-03-01', '1942-09-01', 'German Submarine activity (Mar 1942 - Sep 1942)']
		  ]

		}

		console.log(window);

	}
});




