<?php
App::uses('AppController', 'Controller');
/**
 * ShipTypes Controller
 *
 * @property ShipType $ShipType
 */
class ShipTypesController extends AppController {

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->ShipType->recursive = 0;
		$this->set('shipTypes', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->ShipType->id = $id;
		if (!$this->ShipType->exists()) {
			throw new NotFoundException(__('Invalid ship type'));
		}
		$this->set('shipType', $this->ShipType->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->ShipType->create();
			if ($this->ShipType->save($this->request->data)) {
				$this->Session->setFlash(__('The ship type has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The ship type could not be saved. Please, try again.'));
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
		$this->ShipType->id = $id;
		if (!$this->ShipType->exists()) {
			throw new NotFoundException(__('Invalid ship type'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->ShipType->save($this->request->data)) {
				$this->Session->setFlash(__('The ship type has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The ship type could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->ShipType->read(null, $id);
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
		$this->ShipType->id = $id;
		if (!$this->ShipType->exists()) {
			throw new NotFoundException(__('Invalid ship type'));
		}
		if ($this->ShipType->delete()) {
			$this->Session->setFlash(__('Ship type deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Ship type was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
