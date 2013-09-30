<?php
App::uses('AppModel', 'Model');
/**
 * ShipType Model
 *
 * @property Ship $Ship
 */
class ShipType extends AppModel {


	//The Associations below have been created with all possible keys, those that are not needed can be removed

/**
 * hasMany associations
 *
 * @var array
 */
	public $hasMany = array(
		'Ship' => array(
			'className' => 'Ship',
			'foreignKey' => 'ship_type_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

}
