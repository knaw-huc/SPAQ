<?php

// for testing 
// print_r($_REQUEST);

$errors = array();

// $headers = getallheaders();
// the javascript in the client makes the OWN headers lowercase according to specs, but not the normal headers. RFC 2616

$headers = array_change_key_case(getallheaders(), CASE_LOWER);

if(array_key_exists('naam', $headers)){
    $errors[] = 'blub'; 
    $name = $headers['naam'];
 } else {
    $errors[] = 'noblub'; 

    $name = '';
 }
if($name === ''){
    $errors[] = 'empty header';
} else {
    $errors[] = 'no errors';
}

// $data = file_get_contents('php://input');
// // write the data out to the file


$date = new DateTime();
// echo $date->getTimestamp();
$data = 'hoi: ' . date("Y-m-d H:i:s", $date->getTimestamp()) . "\n";
$fp = fopen("storage/log.txt", "ab");
// has to built by the webserver, had a write problem with a sync of log.txt 

fwrite($fp, $data);
fclose($fp);


$status = "OK";

if(! file_exists("storage/log.txt")){
    $status = "NOTOK";
}

header('Content-Type: application/json');
// echo json_encode(array("phpstatus" => $status));
echo json_encode(array("phpstatus" => $status, "headers" => $headers, "errors" => $errors ));