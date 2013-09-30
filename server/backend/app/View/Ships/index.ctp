<div class="ships index">
	<h2><?php echo __('Ships'); ?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id'); ?></th>
			<th><?php echo $this->Paginator->sort('country_id'); ?></th>
			<th><?php echo $this->Paginator->sort('ship_type_id'); ?></th>
			<th><?php echo $this->Paginator->sort('ship_class_id'); ?></th>
			<th><?php echo $this->Paginator->sort('name'); ?></th>
			<th><?php echo $this->Paginator->sort('tonnage'); ?></th>
			<th><?php echo $this->Paginator->sort('start_date'); ?></th>
			<th><?php echo $this->Paginator->sort('sunk_date'); ?></th>
			<th><?php echo $this->Paginator->sort('sunk_report'); ?></th>
			<th><?php echo $this->Paginator->sort('seamen_losses'); ?></th>
			<th><?php echo $this->Paginator->sort('x'); ?></th>
			<th><?php echo $this->Paginator->sort('y'); ?></th>
			<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
	foreach ($ships as $ship): ?>
	<tr>
		<td><?php echo h($ship['Ship']['id']); ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($ship['Country']['name'], array('controller' => 'countries', 'action' => 'view', $ship['Country']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($ship['ShipType']['name'], array('controller' => 'ship_types', 'action' => 'view', $ship['ShipType']['id'])); ?>
		</td>
		<td>
			<?php echo $this->Html->link($ship['ShipClass']['name'], array('controller' => 'ship_classes', 'action' => 'view', $ship['ShipClass']['id'])); ?>
		</td>
		<td><?php echo h($ship['Ship']['name']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['tonnage']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['start_date']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['sunk_date']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['sunk_report']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['seamen_losses']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['x']); ?>&nbsp;</td>
		<td><?php echo h($ship['Ship']['y']); ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View'), array('action' => 'view', $ship['Ship']['id'])); ?>
			<?php echo $this->Html->link(__('Edit'), array('action' => 'edit', $ship['Ship']['id'])); ?>
			<?php echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $ship['Ship']['id']), null, __('Are you sure you want to delete # %s?', $ship['Ship']['id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page {:page} of {:pages}, showing {:current} records out of {:count} total, starting on record {:start}, ending on {:end}')
	));
	?>	</p>

	<div class="paging">
	<?php
		echo $this->Paginator->prev('< ' . __('previous'), array(), null, array('class' => 'prev disabled'));
		echo $this->Paginator->numbers(array('separator' => ''));
		echo $this->Paginator->next(__('next') . ' >', array(), null, array('class' => 'next disabled'));
	?>
	</div>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('New Ship'), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Countries'), array('controller' => 'countries', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Country'), array('controller' => 'countries', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Types'), array('controller' => 'ship_types', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Type'), array('controller' => 'ship_types', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Classes'), array('controller' => 'ship_classes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Class'), array('controller' => 'ship_classes', 'action' => 'add')); ?> </li>
	</ul>
</div>
