<?php

header('Content-Type: application/json');

$ret = [
  [ 'contenido'=>'hola', 'tipo'=>2 ],
  [ 'contenido'=>'hello', 'tipo'=>3 ],
  [ 'contenido'=>'bonjour', 'tipo'=>1 ]
];

echo json_encode($ret);
