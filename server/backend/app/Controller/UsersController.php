<?php
App::uses('AppController', 'Controller');
App::uses('CakeEmail', 'Network/Email');
/**
 * Users Controller
 *
 * @property User $User
 */
class UsersController extends AppController {

	public $name = 'Users';

	public function beforeFilter(){
		parent::beforeFilter();
		$this->Auth->allow('add');
	}

	public function isAuthorized($user){
		if(in_array($this->action, array('edit', 'delete'))) {
			if($user['id'] != $this->request->params['pass'][0]) {
				return false;
			}
			return true;
		}
	}

	public function login(){
		if ($this->request->is('post')) {
      if ($this->Auth->login()) {
          $this->redirect($this->Auth->redirect());
      }else
      	$this->Session->setFlash(__('Your username and password combination is wrong, try again'));
    }
	}
	
	public function logout(){
		$this->redirect($this->Auth->logout());
	}

	public function register(){

		if ($this->request->is('post')) {
			$this->User->create();
			
			$token = substr( str_shuffle( 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_' ) , 0 , 32 );
			$this->User->set('token', $token);
			//$this->Auth->request->data['User']['password'] =  Security::hash( $this->Auth->request->data['User']['password'] );	

			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				
				$userEmail = $this->request->data['User']['email'];
				
				// send registration email
				$email = new CakeEmail();
				$email->template('register', 'default');
				$email->viewVars(array('token' => $token, 'user' => $this->request->data['User']['username']));
				$email->emailFormat('html');
				$email->from(array('writeme@tommykrueger.com' => 'Boedeker TestApp'));
				$email->to($userEmail);
				$email->subject('Registration at Boedeker App');
				$email->send('Hello');
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}

		}
	}



/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->User->recursive = 0;
		$this->set('users', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		$this->set('user', $this->User->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->User->create();
			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}
		}
		$languages = $this->User->Language->find('list');
		$this->set(compact('languages'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->User->read(null, $id);
		}
		$languages = $this->User->Language->find('list');
		$this->set(compact('languages'));
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
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		if ($this->User->delete()) {
			$this->Session->setFlash(__('User deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('User was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
