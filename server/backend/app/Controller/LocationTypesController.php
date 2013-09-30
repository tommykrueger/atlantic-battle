<?php
App::uses('AppController', 'Controller');
/**
 * LocationTypes Controller
 *
 * @property LocationType $LocationType
 */
class LocationTypesController extends AppController {

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->LocationType->recursive = 0;
		$this->set('locationTypes', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->LocationType->id = $id;
		if (!$this->LocationType->exists()) {
			throw new NotFoundException(__('Invalid location type'));
		}
		$this->set('locationType', $this->LocationType->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->LocationType->create();
			if ($this->LocationType->save($this->request->data)) {
				$this->Session->setFlash(__('The location type has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The location type could not be saved. Please, try again.'));
			}
		}
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->LocationType->id = $id;
		if (!$this->LocationType->exists()) {
			throw new NotFoundException(__('Invalid location type'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->LocationType->save($this->request->data)) {
				$this->Session->setFlash(__('The location type has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The location type could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->LocationType->read(null, $id);
		}
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
		$this->LocationType->id = $id;
		if (!$this->LocationType->exists()) {
			throw new NotFoundException(__('Invalid location type'));
		}
		if ($this->LocationType->delete()) {
			$this->Session->setFlash(__('Location type deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Location type was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
