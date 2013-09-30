<?php
App::uses('AppController', 'Controller');
App::uses('CakeEmail', 'Network/Email');
/**
 * Events Controller
 *
 * @property Event $Event
 */
class EventsController extends AppController {

	private $filepath = '../../../../app/assets/js/data/';

	/**
	 * retrieve all ships as JSON
	 */
	public function getJSON(){
		$events = $this->Event->find('all', array('contitions' => array('Event.active' => 1)));
		$events_array = array();

		// prepare array
		for($i=0; $i<count($events); $i++){

			$array = array();

			$array['id'] = $events[$i]['Event']['id'];
			$array['date'] = $events[$i]['Event']['start_date'];
			$array['name'] = $events[$i]['Event']['name'];
			$array['description'] = $events[$i]['Event']['description'];

			$array['locale'] = $events[$i]['Country']['locale'];
			$array['country'] = $events[$i]['Country']['name'];

			$array['x'] = $events[$i]['Location']['x'];
			$array['y'] = $events[$i]['Location']['y'];

			$events_array[] = $array;
		}

		$events_json = json_encode($events_array);

		// save to file
		if(file_put_contents($this->filepath . 'events.json', $events_json)){
			$this->Session->setFlash(__('The file has been generated!'));
		}

		$this->redirect($this->referer());
	}


	public function send_email(){
		$subject = $_REQUEST['subject'];
		$name = $_REQUEST['name'];
		$sent_email = filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL );
		$message = $_REQUEST['message'];

		$data = array();

		if( !$sent_email ){
			$data['message'] = 'Seems like your info causes an error. Check spelling!';
		}else{

			$data['message'] = 'Thank you for your feedback!';

			$email = new CakeEmail();
			$email->template(null, 'feedback');
			$email->emailFormat('html');
			$email->from(array('info@tommykrueger.com' => 'Atlantic Battle App'));

			$email->subject( 'A new message from the Atlantic App' );
			
			$email->to( 'info@tommykrueger.com' );
			$email->send( 

				'<br/><b>Subject:</b> <br/>' . $subject . 
				'<br/><br/><b>Name:</b> <br/>' . $name . 
				'<br/><br/><b>Email:</b> <br/>' . $sent_email . 
				'<br/><br/><b>Message:</b> <br/>' . $message

			);
		}

		echo $data['message'];
		exit();
	}

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Event->recursive = 0;
		$this->set('events', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Event->id = $id;
		if (!$this->Event->exists()) {
			throw new NotFoundException(__('Invalid event'));
		}
		$this->set('event', $this->Event->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Event->create();
			if ($this->Event->save($this->request->data)) {
				$this->Session->setFlash(__('The event has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The event could not be saved. Please, try again.'));
			}
		}
		$countries = $this->Event->Country->find('list');
		$locations = $this->Event->Location->find('list');
		$this->set(compact('countries', 'locations'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->Event->id = $id;
		if (!$this->Event->exists()) {
			throw new NotFoundException(__('Invalid event'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Event->save($this->request->data)) {
				$this->Session->setFlash(__('The event has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The event could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Event->read(null, $id);
		}
		$countries = $this->Event->Country->find('list');
		$locations = $this->Event->Location->find('list');
		$this->set(compact('countries', 'locations'));
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
		$this->Event->id = $id;
		if (!$this->Event->exists()) {
			throw new NotFoundException(__('Invalid event'));
		}
		if ($this->Event->delete()) {
			$this->Session->setFlash(__('Event deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Event was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
