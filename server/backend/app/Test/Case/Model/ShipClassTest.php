<?php
App::uses('ShipClass', 'Model');

/**
 * ShipClass Test Case
 *
 */
class ShipClassTest extends CakeTestCase {

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

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->ShipClass = ClassRegistry::init('ShipClass');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->ShipClass);

		parent::tearDown();
	}

}
