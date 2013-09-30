<?php
App::uses('AppModel', 'Model');
/**
 * Ship Model
 *
 * @property Fleet $Fleet
 * @property Country $Country
 * @property ShipType $ShipType
 * @property ShipClass $ShipClass
 */
class Ship extends AppModel {

/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'name';


	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * belongsTo associations
 *
 * @var array
 */
	public $belongsTo = array(
		'Fleet' => array(
			'className' => 'Fleet',
			'foreignKey' => 'fleet_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Country' => array(
			'className' => 'Country',
			'foreignKey' => 'country_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'ShipType' => array(
			'className' => 'ShipType',
			'foreignKey' => 'ship_type_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'ShipClass' => array(
			'className' => 'ShipClass',
			'foreignKey' => 'ship_class_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
