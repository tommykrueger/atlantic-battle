<?php
App::uses('Ship', 'Model');

/**
 * Ship Test Case
 *
 */
class ShipTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'app.ship',
		'app.fleet',
		'app.location',
		'app.country',
		'app.path',
		'app.event',
		'app.ship_class',
		'app.ship_type',
		'app.location_type'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Ship = ClassRegistry::init('Ship');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Ship);

		parent::tearDown();
	}

}
