<?php


// options http://localhost/server/watch.php?dir=storage (wav)
// http://localhost/server/watch.php?dir=inspect (mp3)

include_once('config.inc.php');
$currentphp = basename(__FILE__); // 

$subsub = '';

$route = array(
    'reception' => RECEPTION,
    'inspect' => INSPECT,
    'storage' => STORAGE
);

$dir = getGET('dir', 'reception');
if(! in_array($dir, array_keys($route))){
    die('don\'t mangle with the parameters');
}


if(array_key_exists($dir, $route)) {
    $scandir = $route[$dir];
} else {
    $scandir = RECEPTION;
}
$list = array();


if ($handle = opendir($scandir)) {
    while (false !== ($entry = readdir($handle))) {
        if(substr($entry, 0, 1) !== "."  && $entry != '.' && $entry != '..'){
            $list[] = $entry;
        }
    }
    closedir($handle);
}

// print_array($list);
$temp = new Smarty_Specifiek();
$temp->assign('subsub', $subsub);
$temp->assign('dir', $dir);
$temp->assign('currentphp', $currentphp);

$temp->assign('list', $list);
$temp->display('list.tpl');
die;
