<div class="users form">
<?php echo $this->Form->create('User'); ?>
	<fieldset>
		<legend><?php echo __('Add User'); ?></legend>
	<?php
		echo $this->Form->input('language_id');
		echo $this->Form->input('username');
		echo $this->Form->input('password');
		echo $this->Form->input('password_confirmation', array('type' => 'password'));
		echo $this->Form->input('email');
		echo $this->Form->input('last_login');
		echo $this->Form->input('failed_login');
		echo $this->Form->input('attempts');
		echo $this->Form->input('token');
		echo $this->Form->input('role');
		echo $this->Form->input('active');
		echo $this->Form->input('lastname');
		echo $this->Form->input('firstname');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Users'), array('action' => 'index')); ?></li>
		<li><?php echo $this->Html->link(__('List Languages'), array('controller' => 'languages', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Language'), array('controller' => 'languages', 'action' => 'add')); ?> </li>
	</ul>
</div>