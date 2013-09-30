<h1><?php echo __('Login'); ?></h1>
<?php
echo $this->Session->flash('auth');
echo $this->Session->flash();
echo $this->Form->create();
echo $this->Form->input('username');
echo $this->Form->input('password');
echo $this->Form->end(__('Login'));
?>

