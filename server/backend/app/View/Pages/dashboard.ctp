<?php

?>


<div class="actions">
  <p>Here you can generate the data files based on the data in this database. The files will be automatically saved in json format and are loaded directly into the application. <span style="color: red;">Remember that existing files will be overwritten!</span></p>
  <p><strong>Generate Data: </strong></p>
  <ul>
    <li><?php echo $this->Html->link('Ships', array('controller' => 'ships', 'action' => 'getJSON')); ?></li>
    <!-- <li><?php echo $this->Html->link('Ship Types', array('controller' => 'ship_types', 'action' => 'getJSON')); ?></li>
    <li><?php echo $this->Html->link('Ship Classes', array('controller' => 'ship_classes', 'action' => 'getJSON')); ?></li>-->
    <li><?php echo $this->Html->link('Locations', array('controller' => 'locations', 'action' => 'getJSON')); ?></li>
    <li><?php echo $this->Html->link('Events', array('controller' => 'events', 'action' => 'getJSON')); ?></li>
    <!--<li><?php echo $this->Html->link('Countries', array('controller' => 'countries', 'action' => 'getJSON')); ?></li>
    <li><?php echo $this->Html->link('Fleets', array('controller' => 'fleets', 'action' => 'getJSON')); ?></li>

  -->
  </ul>
</div>


<div class="statistics index">
  <h3>Some Statistics:</h3>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Ships', array('controller' => 'ships', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($ships)?></td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('U-Boats', array('controller' => 'ships', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td>
          <?php 
            $amount = 0;
            foreach($ships as $ship):
              if($ship['Ship']['ship_type_id'] == '14') 
                $amount++;
            endforeach;
          ?>
          <?php echo $amount?>
        </td>
      </tr>
       <tr>
        <td>German</td>
        <td>
          <?php 
            $amount = 0;
            foreach($ships as $ship):
              if($ship['Ship']['ship_type_id'] == '14' && $ship['Ship']['country_id'] == 46) 
                $amount++;
            endforeach;
          ?>
          <?php echo $amount?>
        </td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Ship Types', array('controller' => 'ship_types', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($ship_types)?></td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Ship Classes', array('controller' => 'ship_classes', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($ship_classes)?></td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Locations', array('controller' => 'locations', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($locations)?></td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Events', array('controller' => 'events', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($events)?></td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Fleets', array('controller' => 'fleets', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($fleets)?></td>
      </tr>
    </table>
  </div>

  <div class="content-block">
    <h3><?php echo $this->Html->link('Countries', array('controller' => 'countries', 'action' => 'index')); ?></h3>

    <table>
      <tr>
        <td>Total</td>
        <td><?php echo count($countries)?></td>
      </tr>
    </table>
  </div>
</div>


