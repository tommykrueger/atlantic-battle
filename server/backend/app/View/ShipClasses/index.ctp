<div class="shipClasses index">
	<h2><?php echo __('Ship Classes'); ?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id'); ?></th>
			<th><?php echo $this->Paginator->sort('country_id'); ?></th>
			<th><?php echo $this->Paginator->sort('ship_type_id'); ?></th>
			<th><?php echo $this->Paginator->sort('name'); ?></th>
			<th><?php echo $this->Paginator->sort('decription'); ?></th>
			<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
	foreach ($shipClasses as $shipClass): ?>
	<tr>
		<td><?php echo h($shipClass['ShipClass']['id']); ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($shipClass['Country']['name'], array('controller' => 'countries', 'action' => 'view', $shipClass['Country']['id'])); ?>
		</td>
		<td><?php echo h($shipClass['ShipClass']['ship_type_id']); ?>&nbsp;</td>
		<td><?php echo h($shipClass['ShipClass']['name']); ?>&nbsp;</td>
		<td><?php echo h($shipClass['ShipClass']['decription']); ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View'), array('action' => 'view', $shipClass['ShipClass']['id'])); ?>
			<?php echo $this->Html->link(__('Edit'), array('action' => 'edit', $shipClass['ShipClass']['id'])); ?>
			<?php echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $shipClass['ShipClass']['id']), null, __('Are you sure you want to delete # %s?', $shipClass['ShipClass']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Ship Class'), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Countries'), array('controller' => 'countries', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Country'), array('controller' => 'countries', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ships'), array('controller' => 'ships', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship'), array('controller' => 'ships', 'action' => 'add')); ?> </li>
	</ul>
</div>
