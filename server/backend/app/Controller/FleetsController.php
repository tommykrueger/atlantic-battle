<?php
App::uses('AppController', 'Controller');
/**
 * Fleets Controller
 *
 * @property Fleet $Fleet
 */
class FleetsController extends AppController {

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Fleet->recursive = 0;
		$this->set('fleets', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Fleet->id = $id;
		if (!$this->Fleet->exists()) {
			throw new NotFoundException(__('Invalid fleet'));
		}
		$this->set('fleet', $this->Fleet->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Fleet->create();
			if ($this->Fleet->save($this->request->data)) {
				$this->Session->setFlash(__('The fleet has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fleet could not be saved. Please, try again.'));
			}
		}
		$locations = $this->Fleet->Location->find('list');
		$this->set(compact('locations'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->Fleet->id = $id;
		if (!$this->Fleet->exists()) {
			throw new NotFoundException(__('Invalid fleet'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Fleet->save($this->request->data)) {
				$this->Session->setFlash(__('The fleet has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fleet could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Fleet->read(null, $id);
		}
		$locations = $this->Fleet->Location->find('list');
		$this->set(compact('locations'));
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
		$this->Fleet->id = $id;
		if (!$this->Fleet->exists()) {
			throw new NotFoundException(__('Invalid fleet'));
		}
		if ($this->Fleet->delete()) {
			$this->Session->setFlash(__('Fleet deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Fleet was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
