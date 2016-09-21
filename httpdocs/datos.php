<?php

header('Content-Type: application/json');

$ret = [
  ['contenido'=>'hola'],
  ['contenido'=>'holas'],
  ['contenido'=>'holasdf']
];

echo json_encode($ret);
