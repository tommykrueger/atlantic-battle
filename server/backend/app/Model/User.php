<?php
App::uses('AppModel', 'Model');
/**
 * User Model
 *
 * @property Language $Language
 */
class User extends AppModel {


	//The Associations below have been created with all possible keys, those that are not needed can be removed
	public $name = 'User';
	public $displayField = 'username';
	
	/**
	 * belongsTo associations
	 *
	 * @var array
	 */
	public $belongsTo = array(
		'Language' => array(
			'className' => 'Language',
			'foreignKey' => 'language_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $validate = array(
		'name' => array(
			'Please enter your name' => array(
				'rule' => 'notempty',
				'message' => 'Please enter your name'
			)
		),
		'username' => array(
			'Username must be between 5 and 15 characters' => array(
				'rule' => array('between', 5, 15),
				'message' => 'Username must be between 3 and 20 characters'
			),
			'That username has already been taken' => array(
				'rule' => 'isUnique',
				'message' => 'That username has already been taken'
			)
		),
		'email' => array(
			'Valid Email' => array(
				'rule' => array('email'),
				'message' => 'Please enter a valid email address'
			)	
		),
		'password' => array(
			'Not Empty' => array(
				'rule' => 'notEmpty',
				'message' => 'Please enter a password'
			),
			'Match passwords' => array(
				'rule' => 'matchPasswords',
				'message' => 'Your passwords do not match'
			)
		),
		'password_confirmation' => array(
			'Not Empty' => array(
				'rule' => 'notEmpty',
				'message' => 'Please confirm your password'
			)
		),
	);

	public function matchPasswords($data){
		if($data['password'] == $this->data['User']['password_confirmation']){
			return true;
		}
		$this->invalidate('password_confirmation', 'The passwords do not match');
		return false;
	}
	
	public function beforeSave($options = array()){
	if(isset($this->data['User']['password'])){
			$this->data['User']['password'] = AuthComponent::password($this->data['User']['password']);
		}
		return true;
	}	
}
