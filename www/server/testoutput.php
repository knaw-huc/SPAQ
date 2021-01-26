<?php


// print_r($_REQUEST);
// $headers = getallheaders();
// $name = $headers['X-filename'];
// $data = file_get_contents('php://input');
// // write the data out to the file


$date = new DateTime();
// echo $date->getTimestamp();
$data = 'hoi: ' . date("Y-m-d H:i:s", $date->getTimestamp()) . "\n";
$fp = fopen("storage/log.txt", "ab");

fwrite($fp, $data);
fclose($fp);


$status = "OK";

if(! file_exists("storage/log.txt")){
    $status = "NOTOK";
}

header('Content-Type: application/json');

echo json_encode(array("phpstatus" => $status));


// return 'OK';