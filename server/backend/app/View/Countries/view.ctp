<div class="countries view">
<h2><?php  echo __('Country'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($country['Country']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Path'); ?></dt>
		<dd>
			<?php echo $this->Html->link($country['Path']['id'], array('controller' => 'paths', 'action' => 'view', $country['Path']['id'])); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Name'); ?></dt>
		<dd>
			<?php echo h($country['Country']['name']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Description'); ?></dt>
		<dd>
			<?php echo h($country['Country']['description']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Locale'); ?></dt>
		<dd>
			<?php echo h($country['Country']['locale']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Faction'); ?></dt>
		<dd>
			<?php echo h($country['Country']['faction']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('War Entry'); ?></dt>
		<dd>
			<?php echo h($country['Country']['war_entry']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Country'), array('action' => 'edit', $country['Country']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Country'), array('action' => 'delete', $country['Country']['id']), null, __('Are you sure you want to delete # %s?', $country['Country']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Countries'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Country'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Paths'), array('controller' => 'paths', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Path'), array('controller' => 'paths', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Events'), array('controller' => 'events', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Event'), array('controller' => 'events', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Locations'), array('controller' => 'locations', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Location'), array('controller' => 'locations', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ship Classes'), array('controller' => 'ship_classes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship Class'), array('controller' => 'ship_classes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Ships'), array('controller' => 'ships', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Ship'), array('controller' => 'ships', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php echo __('Related Events'); ?></h3>
	<?php if (!empty($country['Event'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Id'); ?></th>
		<th><?php echo __('Country Id'); ?></th>
		<th><?php echo __('Location Id'); ?></th>
		<th><?php echo __('Start Date'); ?></th>
		<th><?php echo __('End Date'); ?></th>
		<th><?php echo __('Name'); ?></th>
		<th><?php echo __('Desciption'); ?></th>
		<th><?php echo __('Active'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($country['Event'] as $event): ?>
		<tr>
			<td><?php echo $event['id']; ?></td>
			<td><?php echo $event['country_id']; ?></td>
			<td><?php echo $event['location_id']; ?></td>
			<td><?php echo $event['start_date']; ?></td>
			<td><?php echo $event['end_date']; ?></td>
			<td><?php echo $event['name']; ?></td>
			<td><?php echo $event['desciption']; ?></td>
			<td><?php echo $event['active']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'events', 'action' => 'view', $event['id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'events', 'action' => 'edit', $event['id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'events', 'action' => 'delete', $event['id']), null, __('Are you sure you want to delete # %s?', $event['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Event'), array('controller' => 'events', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
<div class="related">
	<h3><?php echo __('Related Locations'); ?></h3>
	<?php if (!empty($country['Location'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Id'); ?></th>
		<th><?php echo __('Country Id'); ?></th>
		<th><?php echo __('Location Type Id'); ?></th>
		<th><?php echo __('Name'); ?></th>
		<th><?php echo __('Description'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($country['Location'] as $location): ?>
		<tr>
			<td><?php echo $location['id']; ?></td>
			<td><?php echo $location['country_id']; ?></td>
			<td><?php echo $location['location_type_id']; ?></td>
			<td><?php echo $location['name']; ?></td>
			<td><?php echo $location['description']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'locations', 'action' => 'view', $location['id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'locations', 'action' => 'edit', $location['id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'locations', 'action' => 'delete', $location['id']), null, __('Are you sure you want to delete # %s?', $location['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Location'), array('controller' => 'locations', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
<div class="related">
	<h3><?php echo __('Related Ship Classes'); ?></h3>
	<?php if (!empty($country['ShipClass'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Id'); ?></th>
		<th><?php echo __('Country Id'); ?></th>
		<th><?php echo __('Name'); ?></th>
		<th><?php echo __('Decription'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($country['ShipClass'] as $shipClass): ?>
		<tr>
			<td><?php echo $shipClass['id']; ?></td>
			<td><?php echo $shipClass['country_id']; ?></td>
			<td><?php echo $shipClass['name']; ?></td>
			<td><?php echo $shipClass['decription']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'ship_classes', 'action' => 'view', $shipClass['id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'ship_classes', 'action' => 'edit', $shipClass['id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'ship_classes', 'action' => 'delete', $shipClass['id']), null, __('Are you sure you want to delete # %s?', $shipClass['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Ship Class'), array('controller' => 'ship_classes', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
<div class="related">
	<h3><?php echo __('Related Ships'); ?></h3>
	<?php if (!empty($country['Ship'])): ?>
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
		foreach ($country['Ship'] as $ship): ?>
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
