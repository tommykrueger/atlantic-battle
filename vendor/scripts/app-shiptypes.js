
var ship_types = {
	
	tankers: {
		levelA : {
			name: 'Gentlemen',
			tactics: 0,
			speed: 24,
			torpedoes: 0,
			seaattack: 0,
			seadefence: 0,
			subattack: 0,
			subdefence: 0,
			radius: 10,
			visibility: 5,
			productiontime: 2880000	 	//24 * 30 * 4 * 1000 => 4 months
		}
	},
	
	transports: {
		levelA : {
			name: 'Gentlemen',
			tactics: 0,
			speed: 24,
			torpedoes: 0,
			seaattack: 0,
			seadefence: 0,
			subattack: 0,
			subdefence: 0,
			radius: 10,
			visibility: 5,
			productiontime: 1440000	 	//24 * 30 * 4 * 1000 => 4 months
		}
	},
	
	destroyers: {
		levelA : {
			name: 'Admirality',
			tactics: 0,
			speed: 25,					// 10km per hour // 1 km represents 0.1 px
			torpedoes: 0,
			seaattack: 2,
			seadefence: 4,
			subattack: 6,
			subdefence: 12,
			radius: 10,
			visibility: 5,
			productiontime: 2880000	 	//24 * 30 * 4 * 1000 => 4 months
		},
		levelB : {
			name: 'Tribal',
			tactics: 0,
			speed: 25,
			torpedoes: 0,
			seaattack: 4,
			seadefence: 4,
			subattack: 7,
			subdefence: 13,
			radius: 10,
			visibility: 5,
			productiontime: 1440000	
		},
		levelC : {
			name: 'Havant',
			tactics: 0,
			speed: 26,
			torpedoes: 0,
			seaattack: 5,
			seadefence: 5,
			subattack: 7,
			subdefence: 14,
			radius: 10,
			visibility: 5,
			productiontime: 1440000
		},
		levelD : {
			name: 'Town',
			tactics: 0,
			speed: 26,
			torpedoes: 0,
			seaattack: 6,
			seadefence: 5,
			subattack: 8,
			subdefence: 15,
			radius: 10,
			visibility: 5,
			productiontime: 1440000
		},
		levelE : {
			name: 'Battle',
			tactics: 0,
			speed: 28,
			torpedoes: 0,
			seaattack: 6,
			seadefence: 6,
			subattack: 9,
			subdefence: 16,
			radius: 10,
			visibility: 5,
			productiontime: 1440000
		},
		levelF : {
			name: 'Daring',
			tactics: 0,
			speed: 28,
			torpedoes: 0,
			seaattack: 7,
			seadefence: 7,
			subattack: 10.5,
			subdefence: 18,
			radius: 20,
			visibility: 5,
			productiontime: 1440000
		}
	},
	
	submarines : {
		levelA : {
			name: 'Typ I',
			startdate: '14-02-1936',
			tactics: 0,
			speed: 5,
			torpedoes: 8,
			seaattack: 2,
			seadefence: 0,
			subattack: 2,
			subdefence: 2,
			radius: 10,
			visibility: 0.1,
			productiontime: 2880000
		},
		levelB : {
			name: 'Typ II',
			startdate: '11-02-1935',
			tactics: 0,
			speed: 8,
			torpedoes: 8,
			seaattack: 4,
			seadefence: 1,
			subattack: 2,
			subdefence: 2,
			radius: 10,
			visibility: 0.1,
			productiontime: 2880000
		},
		levelC : {
			name: 'Typ VII',
			startdate: '24-06-1936',
			tactics: 0,
			speed: 8.5,
			torpedoes: 8,
			seaattack: 4.5,
			seadefence: 1.2,
			subattack: 2.2,
			subdefence: 2,
			radius: 10,
			visibility: 0.1,
			productiontime: 2880000
		},
		levelD : {
			name: 'Typ IX',
			startdate: '04-08-1938',
			tactics: 0,
			speed: 9,
			torpedoes: 8,
			seaattack: 2,
			seadefence: 0,
			subattack: 2,
			subdefence: 2,
			radius: 10,
			visibility: 0.1,
			productiontime: 2880000		
		},
		levelE : {
			name: 'Typ XXI',
			startdate: '17-04-1944',
			tactics: 0,
			speed: 11,
			torpedoes: 8,
			seaattack: 2,
			seadefence: 0,
			subattack: 2,
			subdefence: 2,
			radius: 10,
			visibility: 0.1,
			productiontime: 2880000
		}
	}
};


/**
 *
 *
Type I
Type II
Type V (not completed)
Type VII - Known as the 'workhorse' of the U-boats, with 700 active in WW2
Type IX - These ocean-going U-boats operated as far as the Indian Ocean with the Japanese (Monsun Gruppe), and the South Atlantic.
Type X
Type XI
Type XIV - Used to resupply other U-boats; nicknamed the Milk Cow
Type XVII
Type XVIII
Type XXI - Known as the Elektroboot.
Type XXIII
Type XXVI
 *
 *
 */ 