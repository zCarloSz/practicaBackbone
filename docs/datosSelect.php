<?php

header('Content-Type: application/json');

$ret = [
  [ 'id'=>1, 'nombre'=>'bug' ],
  [ 'id'=>2, 'nombre'=>'feature' ],
  [ 'id'=>3, 'nombre'=>'new' ]
];

echo json_encode($ret);
