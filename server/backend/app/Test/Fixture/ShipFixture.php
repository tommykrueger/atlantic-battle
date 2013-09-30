<?php
/**
 * ShipFixture
 *
 */
class ShipFixture extends CakeTestFixture {

/**
 * Fields
 *
 * @var array
 */
	public $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => null, 'key' => 'primary'),
		'fleet_id' => array('type' => 'integer', 'null' => false, 'default' => null, 'key' => 'index'),
		'country_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'ship_type_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'ship_class_id' => array('type' => 'integer', 'null' => false, 'default' => null),
		'name' => array('type' => 'string', 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'tonnage' => array('type' => 'string', 'null' => false, 'default' => null, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'description' => array('type' => 'text', 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'start_date' => array('type' => 'datetime', 'null' => true, 'default' => null),
		'sunk_date' => array('type' => 'datetime', 'null' => true, 'default' => null),
		'sunk_report' => array('type' => 'text', 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'seamen_losses' => array('type' => 'integer', 'null' => false, 'default' => null, 'length' => 10),
		'source' => array('type' => 'string', 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'x' => array('type' => 'float', 'null' => true, 'default' => null),
		'y' => array('type' => 'float', 'null' => true, 'default' => null),
		'indexes' => array(
			'PRIMARY' => array('column' => 'id', 'unique' => 1),
			'fleet_id' => array('column' => 'fleet_id', 'unique' => 0)
		),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);

/**
 * Records
 *
 * @var array
 */
	public $records = array(
		array(
			'id' => 1,
			'fleet_id' => 1,
			'country_id' => 1,
			'ship_type_id' => 1,
			'ship_class_id' => 1,
			'name' => 'Lorem ipsum dolor sit amet',
			'tonnage' => 'Lorem ipsum dolor sit amet',
			'description' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
			'start_date' => '2013-09-30 15:04:39',
			'sunk_date' => '2013-09-30 15:04:39',
			'sunk_report' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
			'seamen_losses' => 1,
			'source' => 'Lorem ipsum dolor sit amet',
			'x' => 1,
			'y' => 1
		),
	);

}
