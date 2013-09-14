
/**
 * The routes define the paths that ships can travel. They are used for convoys but sometimes also for
 * submarine fleets.
 * 
 * Every route has an ID which is connected to the SVG path on the map. It also has a start city and end city.
 * A convoy always gonna travel from the start to the end without interruption (even if a submarine attack occurs)
 */
var _ROUTES = {
	'HL' : {
		pathID: 'route001',
		start: 'halifax',
		end: 'liverpool'
	},
	'SL' : {
		pathID: 'route002',
		start: 'stjohns',
		end: 'liverpool'
	},
	/*
	'SYL' : {
		pathID: 'route002',
		start: 'sydney',
		end: 'liverpool'
	},
	*/
	'TL' : {
		pathID: 'route003',
		start: 'trinidad',
		end: 'liverpool'
	},
	/*
	'GL' : {
		pathID: 'route003',
		start: 'gibraltar',
		end: 'liverpool'
	},
	*/
	'FL' : {
		pathID: 'route005',
		start: 'freetown',
		end: 'liverpool'
	},
	'CL' : {
		pathID: 'route004',
		start: 'capetown',
		end: 'liverpool'
	},
	
	
	'LM' : {
		pathID: 'route007',
		start: 'liverpool',
		end: 'murmansk'
	},
	'LA' : {
		pathID: 'route008',
		start: 'liverpool',
		end: 'archangelsk'
	}
};
