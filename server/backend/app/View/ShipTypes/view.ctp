<div class="shipTypes view">
<h2><?php  echo __('Ship Type'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($shipType['ShipType']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Name'); ?></dt>
		<dd>
			<?php echo h($shipType['ShipType']['name']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Type'); ?></dt>
		<dd>
			<?php echo h($shipType['ShipType']['type']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Description'); ?></dt>
		<dd>
			<?php echo h($shipType['ShipType']['description']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Ship Type'), array('action' => 'edit', $shipType['ShipType']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Ship Type'), array('action' => 'delete', $shipType['ShipType']['id']), null, __('Are you sure you want to delete # %s?', $shipType['ShipType']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Types'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Type'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ships'), array('controller' => 'ships', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship'), array('controller' => 'ships', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php echo __('Related Ships'); ?></h3>
	<?php if (!empty($shipType['Ship'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Id'); ?></th>
		<th><?php echo __('Fleet Id'); ?></th>
		<th><?php echo __('Country Id'); ?></th>
		<th><?php echo __('Ship Type Id'); ?></th>
		<th><?php echo __('Ship Class Id'); ?></th>
		<th><?php echo __('Name'); ?></th>
		<th><?php echo __('Description'); ?></th>
		<th><?php echo __('Start Date'); ?></th>
		<th><?php echo __('Sunk Date'); ?></th>
		<th><?php echo __('Sunk Report'); ?></th>
		<th><?php echo __('Source'); ?></th>
		<th><?php echo __('X'); ?></th>
		<th><?php echo __('Y'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($shipType['Ship'] as $ship): ?>
		<tr>
			<td><?php echo $ship['id']; ?></td>
			<td><?php echo $ship['fleet_id']; ?></td>
			<td><?php echo $ship['country_id']; ?></td>
			<td><?php echo $ship['ship_type_id']; ?></td>
			<td><?php echo $ship['ship_class_id']; ?></td>
			<td><?php echo $ship['name']; ?></td>
			<td><?php echo $ship['description']; ?></td>
			<td><?php echo $ship['start_date']; ?></td>
			<td><?php echo $ship['sunk_date']; ?></td>
			<td><?php echo $ship['sunk_report']; ?></td>
			<td><?php echo $ship['source']; ?></td>
			<td><?php echo $ship['x']; ?></td>
			<td><?php echo $ship['y']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'ships', 'action' => 'view', $ship['id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'ships', 'action' => 'edit', $ship['id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'ships', 'action' => 'delete', $ship['id']), null, __('Are you sure you want to delete # %s?', $ship['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Ship'), array('controller' => 'ships', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
