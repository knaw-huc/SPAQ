<?php

header('Content-Type: application/json');

// $headers = getallheaders(); 
define('APP_DIR', __DIR__ . '/'); // absolute path to current directory
define('RECEPTION', APP_DIR . 'reception');

$headers = array_change_key_case(getallheaders(), CASE_LOWER);
// the fieldnames of added headers on the clientside become lowercase, keep everthing lowercase, best practice 
// https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive

// A simple approach to dealing with case insenstive headers (as per RFC2616) is via the built in array_change_key_case() function:
// $headers = array_change_key_case(getallheaders(), CASE_LOWER);
// https://www.php.net/manual/en/function.getallheaders.php

// but the normal headers stay uppercase... ??

$name = $headers['x-filename'];
$extension = $headers['x-tension'];

$data = file_get_contents('php://input');
// write the data out to the file1

// SOME ERROR HANDLING 
$status = "OK";
$typeproblem = '';

$fp = fopen( RECEPTION . "/$name.$extension", "wb");
fwrite($fp, $data);
fclose($fp);

if(! file_exists("reception/$name.$extension")){
    $status = "NOT OK";
}

echo json_encode(array("storestatus" => $status));