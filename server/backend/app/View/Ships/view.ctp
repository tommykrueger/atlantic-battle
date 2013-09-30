<div class="ships view">
<h2><?php  echo __('Ship'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Fleet Id'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['fleet_id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Country'); ?></dt>
		<dd>
			<?php echo $this->Html->link($ship['Country']['name'], array('controller' => 'countries', 'action' => 'view', $ship['Country']['id'])); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Ship Type'); ?></dt>
		<dd>
			<?php echo $this->Html->link($ship['ShipType']['name'], array('controller' => 'ship_types', 'action' => 'view', $ship['ShipType']['id'])); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Ship Class'); ?></dt>
		<dd>
			<?php echo $this->Html->link($ship['ShipClass']['name'], array('controller' => 'ship_classes', 'action' => 'view', $ship['ShipClass']['id'])); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Name'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['name']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Tonnage'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['tonnage']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Description'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['description']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Start Date'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['start_date']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Sunk Date'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['sunk_date']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Sunk Report'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['sunk_report']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Seamen Losses'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['seamen_losses']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Source'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['source']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('X'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['x']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Y'); ?></dt>
		<dd>
			<?php echo h($ship['Ship']['y']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Ship'), array('action' => 'edit', $ship['Ship']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Ship'), array('action' => 'delete', $ship['Ship']['id']), null, __('Are you sure you want to delete # %s?', $ship['Ship']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Ships'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Countries'), array('controller' => 'countries', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Country'), array('controller' => 'countries', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Types'), array('controller' => 'ship_types', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Type'), array('controller' => 'ship_types', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Classes'), array('controller' => 'ship_classes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Class'), array('controller' => 'ship_classes', 'action' => 'add')); ?> </li>
	</ul>
</div>
