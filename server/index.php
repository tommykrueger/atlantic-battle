<?php

// save svg object file to json representation
$provinces = array();
$borders = array();
$locations = array();
$convoy_routes = array();
$submarine_zones = array();
$allied_air_zones = array();
$faction_areas = array();

//$xml = simplexml_load_file('../app/assets/svg/worldmap.svg');
$xml = simplexml_load_file('worldmap-detailed.svg');

foreach($xml->g as $graph) {
	if($graph['id'] == 'paths'){
		$provincesGraphs = $graph->children();

		$count = 1;
		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$cleanGraph = str_replace(' ', '', $provincesGraph['d']);
				$provinces[] = 
					array(
						'id' => $count,
						'path' => $cleanGraph,
						'rel' => (string)$provincesGraph['id']
					); 

				$count++;
			}
		}
	}

	// render the islands
	if($graph['id'] == 'islands'){
		$provincesGraphs = $graph->children();

		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$cleanGraph = str_replace(' ', '', $provincesGraph['d']);
				$provinces[] = 
					array(
						'id' => $count,
						'path' => $cleanGraph,
						'rel' => (string)$provincesGraph['id']
					); 

				$count++;
			}
		}
	}

	if($graph['id'] == 'borders'){

		$provincesGraphs = $graph->children();

		$count = 1;
		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$cleanGraph = str_replace(' ', '', $provincesGraph['d']);
				$borders[] = 
					array(
						'id' => $count,
						'path' => $cleanGraph
					); 

				$count++;
			}
		}

	}

	if($graph['id'] == 'locations'){

		$provincesGraphs = $graph->children();

		$count = 1;
		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$locations[] = 
					array(
						'id' => $count,
						'name' => (string)$provincesGraph['id'],
						'x' => (string)$provincesGraph['cx'],
						'y' => (string)$provincesGraph['cy']
					); 

				$count++;
			}
		}

	}

	if($graph['id'] == 'convoy-routes'){

		$provincesGraphs = $graph->children();

		$count = 1;
		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$cleanGraph = str_replace(' ', '', $provincesGraph['d']);

				$convoy_routes[] = 
					array(
						'id' => $count,
						'rel' => (string)$provincesGraph['id'],
						'd' => $cleanGraph
					); 

				$count++;
			}
		}

	}

	// add submarine zones
	if($graph['id'] == 'submarine-zones'){

		$provincesGraphs = $graph->children();

		$count = 1;
		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$cleanGraph = str_replace(' ', '', $provincesGraph['d']);

				$submarine_zones[] = 
					array(
						'id' => $count,
						'rel' => (string)$provincesGraph['id'],
						'd' => $cleanGraph
					); 

				$count++;
			}
		}
	
	}


	if($graph['id'] == 'allied-air-zones'){

		$provincesGraphs = $graph->children();

		$count = 1;
		foreach($provincesGraphs as $provincesGraph){

			if($provincesGraph){

				$cleanGraph = str_replace(' ', '', $provincesGraph['r']);

				$allied_air_zones[] = 
					array(
						'id' => $count,
						'rel' => (string)$provincesGraph['id'],
						'r' => $cleanGraph,
						'cx' => (string)$provincesGraph['cx'],
						'cy' => (string)$provincesGraph['cy']
					); 

				$count++;
			}
		}
	
	}

	// render faction areas
	if($graph['id'] == 'factions'){

		$factionChildren = $graph->children();
		
		$count = 1;
		foreach($factionChildren as $factionChild){

			foreach($factionChild as $factionYears){

				foreach($factionYears as $factionPaths){

					$cleanGraph = str_replace(' ', '', $factionPaths['d']);
					$dates = explode('_', $factionYears['id']);

					$faction_areas[] = 
						array(
							'id' => $count,
							'faction' => (string)$factionChild['id'],
							'start_date' => (string)$dates[0],
							'end_date' => (string)$dates[1],
							'd' => $cleanGraph
						); 

					$count++;
				}
			}
		}
	
	}

}


echo 'provinces rendered: ' . count($provinces) . '<br/>';
$json_provinces = json_encode($provinces);
file_put_contents('../app/assets/js/data/provinces.json', $json_provinces);


echo 'borders rendered: ' . count($borders) . '<br/>';
$json_borders = json_encode($borders);
file_put_contents('../app/assets/js/data/borders.json', $json_borders);

/*
echo 'locations rendered: ' . count($locations) . '<br/>';
$json_locations = json_encode($locations);
file_put_contents('../app/assets/js/data/locations.json', $json_locations);
*/

echo 'convoy routes rendered: ' . count($convoy_routes) . '<br/>';
$json_convoy_routes = json_encode($convoy_routes);
file_put_contents('../app/assets/js/data/convoy_routes.json', $json_convoy_routes);

echo 'submarine zones rendered: ' . count($submarine_zones) . '<br/>';
$json_submarine_zones = json_encode($submarine_zones);
file_put_contents('../app/assets/js/data/submarine_zones.json', $json_submarine_zones);

echo 'allied air zones rendered: ' . count($allied_air_zones) . '<br/>';
$json_allied_air_zones = json_encode($allied_air_zones);
file_put_contents('../app/assets/js/data/allied_air_zones.json', $json_allied_air_zones);


echo 'faction areas rendered: ' . count($faction_areas) . '<br/>';
$json_faction_areas = json_encode($faction_areas);
file_put_contents('../app/assets/js/data/faction_areas.json', $json_faction_areas);

?>