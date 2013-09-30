<?php
App::uses('ShipClassesController', 'Controller');

/**
 * ShipClassesController Test Case
 *
 */
class ShipClassesControllerTest extends ControllerTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'app.ship_class',
		'app.country',
		'app.path',
		'app.event',
		'app.location',
		'app.location_type',
		'app.fleet',
		'app.ship',
		'app.ship_type'
	);

}
