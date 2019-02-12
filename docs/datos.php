<?php

header('Content-Type: application/json');

$rawJSONString = file_get_contents('php://input');
$item = json_decode($rawJSONString);

$archivo = '../appData/tablas.json';

if (count($item) > 0) {
  file_put_contents($archivo, json_encode($item));
} else {
  if (file_exists($archivo)) {
    echo file_get_contents($archivo);
  } else {
    echo '[]';
    /*
    file_put_contents($archivo, json_encode([]));
    echo file_get_contents($archivo);
    */
  }
}
