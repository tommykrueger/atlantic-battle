<?php
App::uses('AppController', 'Controller');
/**
 * Paths Controller
 *
 * @property Path $Path
 */
class PathsController extends AppController {

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Path->recursive = 0;
		$this->set('paths', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Path->id = $id;
		if (!$this->Path->exists()) {
			throw new NotFoundException(__('Invalid path'));
		}
		$this->set('path', $this->Path->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Path->create();
			if ($this->Path->save($this->request->data)) {
				$this->Session->setFlash(__('The path has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The path could not be saved. Please, try again.'));
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
		$this->Path->id = $id;
		if (!$this->Path->exists()) {
			throw new NotFoundException(__('Invalid path'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Path->save($this->request->data)) {
				$this->Session->setFlash(__('The path has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The path could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Path->read(null, $id);
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
		$this->Path->id = $id;
		if (!$this->Path->exists()) {
			throw new NotFoundException(__('Invalid path'));
		}
		if ($this->Path->delete()) {
			$this->Session->setFlash(__('Path deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Path was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
