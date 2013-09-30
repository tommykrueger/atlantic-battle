<div class="paths view">
<h2><?php  echo __('Path'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($path['Path']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Path'); ?></dt>
		<dd>
			<?php echo h($path['Path']['path']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Color'); ?></dt>
		<dd>
			<?php echo h($path['Path']['color']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Path'), array('action' => 'edit', $path['Path']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Path'), array('action' => 'delete', $path['Path']['id']), null, __('Are you sure you want to delete # %s?', $path['Path']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Paths'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Path'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Countries'), array('controller' => 'countries', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Country'), array('controller' => 'countries', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php echo __('Related Countries'); ?></h3>
	<?php if (!empty($path['Country'])): ?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php echo __('Id'); ?></th>
		<th><?php echo __('Path Id'); ?></th>
		<th><?php echo __('Name'); ?></th>
		<th><?php echo __('Description'); ?></th>
		<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($path['Country'] as $country): ?>
		<tr>
			<td><?php echo $country['id']; ?></td>
			<td><?php echo $country['path_id']; ?></td>
			<td><?php echo $country['name']; ?></td>
			<td><?php echo $country['description']; ?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View'), array('controller' => 'countries', 'action' => 'view', $country['id'])); ?>
				<?php echo $this->Html->link(__('Edit'), array('controller' => 'countries', 'action' => 'edit', $country['id'])); ?>
				<?php echo $this->Form->postLink(__('Delete'), array('controller' => 'countries', 'action' => 'delete', $country['id']), null, __('Are you sure you want to delete # %s?', $country['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Country'), array('controller' => 'countries', 'action' => 'add')); ?> </li>
		</ul>
	</div>
</div>
