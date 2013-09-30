<div class="shipTypes form">
<?php echo $this->Form->create('ShipType'); ?>
	<fieldset>
		<legend><?php echo __('Edit Ship Type'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('name');
		echo $this->Form->input('type');
		echo $this->Form->input('description');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $this->Form->value('ShipType.id')), null, __('Are you sure you want to delete # %s?', $this->Form->value('ShipType.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Ship Types'), array('action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('List Ships'), array('controller' => 'ships', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship'), array('controller' => 'ships', 'action' => 'add')); ?> </li>
	</ul>
</div>
