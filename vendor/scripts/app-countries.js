/**
 * Add all country data here
 *
 */

var AI = 'eng';
var COUNTRY = 'ger';

var COLORS = {
	country : '#8DEF8F',
	ally : '#BFECC0',
	enemy : '#E05620',
	occupied : '#8DEF8F'
};

var _countries = {
	'eng' : {
		name: 'Great Britain',
		pathID: 'path422',
		paths: ['path1652', 'path420', 'path1034', 'path306', 'path178', 'path204', 'path340',
		        'path402', 'path870', 'g390', 'path884', 'path1500', 'path1148', 'path262',
		        'path324', 'path330', 'path358', 'path1988', 'path370', 'path326', 'path372', 'path474',
		        'path366', 'path950', 'g2030', 'path1174', 'path1172', 'path1306', 'path834', 'g842', 'path1160',
		        'path216'],
		states : {
			running_convoys : [],		// convoys which are currently on the way
			sunk_submarines : [],
			food: 2000000,
			oil: 10000,
			supplies: 30000,
			surrender: 0 				// 0 - no surrender, 1 - 100% chance to surrender 
		},
		naval : {
			ships: 2300,
			transports: 1200,
			destroyers: 67,
			submarines: 23,
			light_cruisers: 45,
			heavy_cruisers: 23,
			corvettes: 12
				 
		},
		diplomacy : {
			allies : ['can'],
			enemies : ['ger', 'ita', 'hun', 'slv'],
			occupied : []
		},
		cities : ['cardiff', 'liverpool'],
		production : {
			naval: {}
		},
		fleets : {
			'convoy-hl-001' : {
				name: 'Convoy HL 001',
				harbor: 'halifax',
				status: 'based', 		// can be based, moving, attacking/underattack, sighting, retreating
				route: 'HL',
				startdate: '01-07-1940 06',
				chance: 100,
				period: 604800, //every 2 weeks
				ships : {
					tankers: {
						levelA: ['tanker-001', 'tanker-002', 'tanker-003', 'tanker-004', 'tanker-005']
					},
					transports: {
						levelA: ['transport-001', 'transport-002', 'transport-003', 'transport-004', 'transport-005', 'transport-006', 'transport-007']
					},
					destroyers: {
						levelA: [],
						levelB: ['hms-halifax', 'hms-gibraltar', 'hms-ajax']
					},
					submarines: {
						levelA: []
					}
				}
			},
			'convoy-hl-002' : {
				name: 'Convoy HL 002',
				harbor: 'halifax',
				status: 'based',
				route: 'HL',
				startdate: '06-07-1940 15',
				chance: 100,
				period: 604800,
				ships : {
					tankers: {
						levelA: ['tanker-001', 'tanker-002', 'tanker-003', 'tanker-004', 'tanker-005']
					},
					transports: {
						levelA: ['transport-001', 'transport-002', 'transport-003', 'transport-004', 'transport-005', 'transport-006', 'transport-007']
					},
					destroyers: {
						levelA: [],
						levelB: ['hms-halifax', 'hms-gibraltar', 'hms-ajax']
					},
					submarines: {
						levelA: []
					}
				}
			},
			'convoy-cl-001' : {
				name: 'Convoy CL 001',
				harbor: 'capetown',
				status: 'based',
				route: 'CL',
				startdate: '02-07-1940 04',
				period: 604800, //every week
				ships : {
					tankers: {
						levelA: ['tanker-001', 'tanker-002', 'tanker-003', 'tanker-004', 'tanker-005']
					},
					transports: {
						levelA: ['transport-001', 'transport-002', 'transport-003', 'transport-004', 'transport-005', 'transport-006', 'transport-007']
					},
					destroyers: {
						levelA: [],
						levelB: ['hms-liverpool', 'hms-sussex', 'hms-hope']
					}
				}
			}
		}
		 	
	},
	'ger' : {
		name: 'Germany',
		pathID: 'path668',
		paths: ['path752', 'path236'],
		states : {
			running_convoys : [],		// convoys which are currently on the way
			sunk_submarines : [],
			food: 2000000,
			oil: 10000,
			supplies: 30000,
			surrender: 0 				// 0 - no surrender, 1 - 100% chance to surrender 
		},
		naval : {
			ships: 2300,
			transports: 1200,
			destroyers: 67,
			submarines: 23,
			light_cruisers: 45,
			heavy_cruisers: 23,
			corvettes: 12
				 
		},
		diplomacy : {
			allies : ['ita', 'hun', 'slv'],
			enemies : ['eng', 'can'],
			occupied : ['fra', 'bel', 'hol', 'lux', 'pol', 'chz', 'den', 'nor'] 		
		},
		cities : ['kiel', 'bremen', 'hamburg', 'wilhelmshaven', 'brest', 'lorient', 'st-nazaire', 'la-rochelle', 'bergen', 'trondheim', 'harstad'],
		production : {
			naval: {
				submarine: {
					levelB: { 
						'U-102' : 12,
						'U-104' : 02,
						'U-112' : 56,
						'U-113' : 35
					},
					levelC: { 
						'U-114' : 14,
						'U-115' : 18,
						'U-116' : 87,
						'U-118' : 65,
						'U-121' : 34,
						'U-122' : 27,
						'U-125' : 62,
						'U-156' : 45,
						'U-158' : 59,
						'U-159' : 99.7,
						'U-161' : 14
					}
				}
			},
			air: {
				naval_bomber: 10
			},
			land: {
			}
		},
		fleets : {
			'u-boat-flottilla-102' : {
				name: 'U-Boat Fleet 102',
				harbor: 'lorient',
				status: 'based',
				route: '',
				startdate: '',
				starttime: '',
				period: 604800, //every week
				pos: {
					x: 0,
					y: 0
				},
				chance: 70,
				ships : {
					submarines: {
						levelA: ['U-43', 'U-45', 'U-105'],
						levelB: ['U-123', 'U-227', 'U-567']
					}
				}
			},
			'u-boat-flottilla-103' : {
				name: 'U-Boat Fleet 103',
				harbor: 'trondheim',
				status: 'based',
				route: '',
				startdate: '',
				starttime: '',
				period: 604800, //every week
				pos: {
					x: 0,
					y: 0
				},
				chance: 70,
				ships : ['u-133', 'u-345', 'u-405', 'u-423', 'u-527', 'u-528', 'u-566', 'u-589']
			}
		}
		
	},
	'can' : {
		name: 'Canada',
		pathID: 'path1550',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'fra' : {
		name: 'France',
		pathID: 'path2000',
		paths: ['path2002'],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'ita' : {
		name: 'Italy',
		pathID: 'path712',
		paths: ['path714', 'path716'],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'bel' : {
		name: 'Belgium',
		pathID: 'path220',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'hol' : {
		name: 'Netherlands',
		pathID: 'path692',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'lux' : {
		name: 'Luxembourg',
		pathID: 'path246',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'pol' : {
		name: 'Poland',
		pathID: 'path604',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'chz' : {
		name: 'Chech Republic',
		pathID: 'path228',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},	
	'den' : {
		name: 'Denmark',
		pathID: 'path1730',
		paths: ['path1728', 'path1732', 'path1742'],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'nor' : {
		name: 'Norway',
		pathID: 'path1798',
		paths: ['path1790', 'path1792'],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'hun' : {
		name: 'Hungary',
		pathID: 'path234',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	},
	'slv' : {
		name: 'Slovakia',
		pathID: 'path230',
		paths: [],
		diplomacy: {
			occupied: []
		},
		fleets: {}
	}
};

