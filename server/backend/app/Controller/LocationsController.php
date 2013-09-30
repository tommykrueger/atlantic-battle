<?php
App::uses('AppController', 'Controller');
/**
 * Locations Controller
 *
 * @property Location $Location
 */
class LocationsController extends AppController {

	private $filepath = '../../../../app/assets/js/data/';

	/**
	 * retrieve all ships as JSON
	 */
	public function getJSON(){
		$locations = $this->Location->find('all');
		$locations_array = array();

		// prepare array
		for($i=0; $i<count($locations); $i++){

			$array = array();

			$array['id'] = $locations[$i]['Location']['id'];
			$array['name'] = $locations[$i]['Location']['name'];
			$array['location_type'] = strtolower($locations[$i]['LocationType']['name']);
			$array['description'] = $locations[$i]['Location']['description'];

			$array['locale'] = $locations[$i]['Country']['locale'];
			$array['country'] = $locations[$i]['Country']['name'];

			$array['x'] = $locations[$i]['Location']['x'];
			$array['y'] = $locations[$i]['Location']['y'];

			$locations_array[] = $array;
		}

		$locations_json = json_encode($locations_array);

		// save to file
		if(file_put_contents($this->filepath . 'locations.json', $locations_json)){
			$this->Session->setFlash(__('The file has been generated!'));
		}

		$this->redirect($this->referer());
	}


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Location->recursive = 0;
		$this->set('locations', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Location->id = $id;
		if (!$this->Location->exists()) {
			throw new NotFoundException(__('Invalid location'));
		}
		$this->set('location', $this->Location->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Location->create();
			if ($this->Location->save($this->request->data)) {
				$this->Session->setFlash(__('Location saved.'));
				//$this->flash(__('Location saved.'), array('action' => 'index'));
			} else {
			}
		}
		$countries = $this->Location->Country->find('list');
		$locationTypes = $this->Location->LocationType->find('list');
		$this->set(compact('countries', 'locationTypes'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->Location->id = $id;
		if (!$this->Location->exists()) {
			throw new NotFoundException(__('Invalid location'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Location->save($this->request->data)) {
				$this->Session->setFlash(__('Location saved.'));
				//$this->flash(__('The location has been saved.'), array('action' => 'index'));
			} else {
			}
		} else {
			$this->request->data = $this->Location->read(null, $id);
		}
		$countries = $this->Location->Country->find('list');
		$locationTypes = $this->Location->LocationType->find('list');
		$this->set(compact('countries', 'locationTypes'));
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
		$this->Location->id = $id;
		if (!$this->Location->exists()) {
			throw new NotFoundException(__('Invalid location'));
		}
		if ($this->Location->delete()) {
			$this->Session->setFlash(__('Location deleted'));
			//$this->flash(__('Location deleted'), array('action' => 'index'));
		}
		//$this->flash(__('Location was not deleted'), array('action' => 'index'));
		$this->Session->setFlash(__('Location was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
