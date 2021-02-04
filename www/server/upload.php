<?php

header('Content-Type: application/json');

$headers = getallheaders();
// added headers become lowercase, but no problem at first why?
$name = $headers['x-filename'];
$extension = $headers['x-tension'];
$data = file_get_contents('php://input');
// write the data out to the file

// SOME ERROR HANDLING 
$status = "OK";
$typeproblem = '';

$fp = fopen("storage/$name.$extension", "wb");
fwrite($fp, $data);
fclose($fp);

if(! file_exists("storage/$name.$extension")){
    $status = "NOT OK";
}

echo json_encode(array("storestatus" => $status));