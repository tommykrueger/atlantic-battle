<div class="languages form">
<?php echo $this->Form->create('Language'); ?>
	<fieldset>
		<legend><?php echo __('Add Language'); ?></legend>
	<?php
		echo $this->Form->input('locale');
		echo $this->Form->input('localelong');
		echo $this->Form->input('name');
		echo $this->Form->input('active');
		echo $this->Form->input('image');
		echo $this->Form->input('position');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Languages'), array('action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('List Users'), array('controller' => 'users', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New User'), array('controller' => 'users', 'action' => 'add')); ?> </li>
	</ul>
</div>
