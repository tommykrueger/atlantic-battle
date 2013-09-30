<div class="ships form">
<?php echo $this->Form->create('Ship'); ?>
	<fieldset>
		<legend><?php echo __('Edit Ship'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('fleet_id');
		echo $this->Form->input('country_id');
		echo $this->Form->input('ship_type_id');
		echo $this->Form->input('ship_class_id');
		echo $this->Form->input('name');
		echo $this->Form->input('tonnage');
		echo $this->Form->input('description');
		echo $this->Form->input('start_date', array('minYear' => '1900'));
		echo $this->Form->input('sunk_date', array('minYear' => '1900'));
		echo $this->Form->input('sunk_report');
		echo $this->Form->input('seamen_losses');
		echo $this->Form->input('source');
		echo $this->Form->input('x');
		echo $this->Form->input('y');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $this->Form->value('Ship.id')), null, __('Are you sure you want to delete # %s?', $this->Form->value('Ship.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Ships'), array('action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('List Countries'), array('controller' => 'countries', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Country'), array('controller' => 'countries', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Types'), array('controller' => 'ship_types', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Type'), array('controller' => 'ship_types', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Classes'), array('controller' => 'ship_classes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Class'), array('controller' => 'ship_classes', 'action' => 'add')); ?> </li>
	</ul>
</div>
