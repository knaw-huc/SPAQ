<?php



header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // activate for cors but it will not become a public api TODO more subtility 
header("Access-Control-Allow-Headers: *"); // activate for cors

define('APP_DIR', __DIR__ . '/'); // absolute path to current directory
define('RECEPTION', APP_DIR . 'reception/'); // what's recorded, temporary (format of the browser)
define('INSPECT', APP_DIR . 'inspect/'); // for previews and checks (mp3 or aac)
define('STORAGE', APP_DIR . 'storage/'); // for long term storage wav or flac

define('FFMPEG', '/usr/bin/ffmpeg'); // not necessary in docker-environmnet I think

$headers = array_change_key_case(getallheaders(), CASE_LOWER);
// the fieldnames of added headers on the clientside become lowercase, keep everthing lowercase, best practice 
// https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive

// A simple approach to dealing with case insenstive headers (as per RFC2616) is via the built in array_change_key_case() function:
// $headers = array_change_key_case(getallheaders(), CASE_LOWER);
// https://www.php.net/manual/en/function.getallheaders.php

// but the normal headers stay uppercase... ??

$name = $headers['x-filename'];
$extension = $headers['x-tension']; // also from client

$data = file_get_contents('php://input');
// write the data out to the file1

// SOME ERROR HANDLING 
$status = "OK";
$typeproblem = '';

$time = date("-Y-m-d-H-i-s");  

$name = $name . $time;

$fp = fopen(RECEPTION . "$name.$extension", "wb");
fwrite($fp, $data);
// fclose($fp);

$bashcmd = 'nothing';
$return = 'x';
// https: //cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html
// also spaces in fielnames possible, but in reality no names allowed?


if (!file_exists(RECEPTION . "$name.$extension")) {
    $status = "NOT OK";
} else {
    if ($extension == 'mp4') {
        // copy to inspect
        copy(RECEPTION . $name . '.' . $extension, INSPECT . $name .  '.' . $extension);
    } else {

        // 'low-res' mp4 (aac) for checking
        $outputformat = '.mp4';
        // $input = escapeshellarg(RECEPTION . $name . '.' . $extension);
        // $output = escapeshellarg(INSPECT . $name . $outputformat);
        $input = RECEPTION . $name . '.' . $extension;
        $output = INSPECT . $name .  $outputformat;
        $bashcmd = 'ffmpeg -i ' .  $input . ' ' .  $output;

        // convert with mpeg, this is for demo purposes, maybe node.js watcher thingie
        $output = exec($bashcmd, $results, $return);
    }

    // high-res for storage not now
    // $outputformat = '.wav';
    // $input = escapeshellarg(RECEPTION . $name . '.' . $extension);
    // $output = escapeshellarg(STORAGE . $name . $outputformat);

    // // $input = RECEPTION . $name . '.' . $extension;
    // // $output = STORAGE . $name . $outputformat;    
    // $bashcmd = 'ffmpeg -i ' .  $input . ' ' .  $output;
    // $output = exec($bashcmd, $results, $return);


    // echo '<br>';
}
// todo more info for both conversion, depends on userdemands a
echo json_encode(array("storestatus" => $status, "mp4conv" => array("bashcmd" => $bashcmd, "return" => $return)));
