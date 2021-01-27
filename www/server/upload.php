<?php

header('Content-Type: application/json');

// print_r($_REQUEST);
$headers = getallheaders();
$name = $headers['X-filename'];
$data = file_get_contents('php://input');
// write the data out to the file

// SOME ERROR HANDLING 
$status = "OK";
$typeproblem = '';



$fp = fopen("storage/$name.ogg", "wb");



fwrite($fp, $data);
fclose($fp);

if(! file_exists("storage/$name.ogg")){
    $status = "NOT OK";
}

echo json_encode(array("storestatus" => $status));