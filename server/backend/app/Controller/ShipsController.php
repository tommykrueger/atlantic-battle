<?php
App::uses('AppController', 'Controller');
include_once('simple_html_dom.php');

/**
 * Ships Controller
 *
 * @property Ship $Ship
 */
class ShipsController extends AppController {

	private $filepath = '../../../../app/assets/js/data/';

	/**
	 * retrieve all ships as JSON
	 */
	public function getJSON(){
		$ships = $this->Ship->find('all');
		$ships_array = array();

		// prepare array
		for($i=0; $i<count($ships); $i++){

			$array = array();

			$array['id'] = $ships[$i]['Ship']['id'];
			$array['name'] = $ships[$i]['Ship']['name'];
			$array['ship_class'] = $ships[$i]['ShipClass']['name'];
			$array['ship_type'] = $ships[$i]['ShipType']['name'];
			$array['ship_type_short'] = $ships[$i]['ShipType']['type'];
			$array['sunk_report'] = $ships[$i]['Ship']['sunk_report'];
			$array['description'] = $ships[$i]['Ship']['description'];

			$array['locale'] = $ships[$i]['Country']['locale'];
			$array['country'] = $ships[$i]['Country']['name'];

			$array['start_date'] = date('Y-m-d', strtotime($ships[$i]['Ship']['start_date']));
			$array['sunk_date'] = date('Y-m-d', strtotime($ships[$i]['Ship']['sunk_date']));

			$array['seamen_losses'] = $ships[$i]['Ship']['seamen_losses'];
			$array['source'] = $ships[$i]['Ship']['source'];

			$array['x'] = $ships[$i]['Ship']['x'];
			$array['y'] = $ships[$i]['Ship']['y'];

			$ships_array[] = $array;
		}

		//var_dump($ships_array);
		$ships_json = json_encode($ships_array);

		// save to file
		if(file_put_contents($this->filepath . 'ships.json', $ships_json)){
			$this->Session->setFlash(__('The file has been generated!'));
		}

		$this->redirect($this->referer());
	}

	// read submarine data from html websites
	public function getData(){

		$length = 1;
		$baseUrl = 'http://uboat.net/boats/';

		$selectors = array(
			'name' => '#content h1',
			'type' => '#content tr',
			'position' => 'tr script'
		);

		// get the submarines list
		for($i=1; $i<=$length; $i++){

			$html = file_get_html($baseUrl . 'u'. $i .'.htm');

			$name;
			foreach($html->find($selectors['name']) as $el){
				var_dump($el->plaintext);
				echo '<br/>';
			}
			
			// get all rows
			$rows = $html->find($selectors['type']);

			foreach ($rows as $row) {
				var_dump(stristr('Commissioned', $row->plaintext));
				//if( strstr('Commissioned', $row->plaintext) ){
					echo $row->plaintext;
					echo '<br/>';
				//}
				
			}

			$positions = $html->find($selectors['position']);
			foreach ($positions as $position) {
				var_dump($position->innertext);
				echo '<br/>';
			}
		}

		exit();
	}

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Ship->recursive = 0;
		$this->set('ships', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Ship->id = $id;
		if (!$this->Ship->exists()) {
			throw new NotFoundException(__('Invalid ship'));
		}
		$this->set('ship', $this->Ship->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Ship->create();
			if ($this->Ship->save($this->request->data)) {
				$this->Session->setFlash(__('The ship has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The ship could not be saved. Please, try again.'));
			}
		}
		$countries = $this->Ship->Country->find('list');
		$shipTypes = $this->Ship->ShipType->find('list');
		$shipClasses = $this->Ship->ShipClass->find('list');
		$this->set(compact('countries', 'shipTypes', 'shipClasses'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->Ship->id = $id;
		if (!$this->Ship->exists()) {
			throw new NotFoundException(__('Invalid ship'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Ship->save($this->request->data)) {
				$this->Session->setFlash(__('The ship has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The ship could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Ship->read(null, $id);
		}
		$countries = $this->Ship->Country->find('list');
		$shipTypes = $this->Ship->ShipType->find('list');
		$shipClasses = $this->Ship->ShipClass->find('list');
		$this->set(compact('countries', 'shipTypes', 'shipClasses'));
	}

/**
 * delete method
 *
 * @throws MethodNotAllowedException
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$this->Ship->id = $id;
		if (!$this->Ship->exists()) {
			throw new NotFoundException(__('Invalid ship'));
		}
		if ($this->Ship->delete()) {
			$this->Session->setFlash(__('Ship deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Ship was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
