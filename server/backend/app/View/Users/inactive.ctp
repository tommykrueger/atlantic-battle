<?php
echo $this->Session->flash('auth');
echo $this->Form->create('User', array('action' => 'register'));
echo $this->Form->input('email');
echo $this->Form->end(__('Resend Activation'));
?>



