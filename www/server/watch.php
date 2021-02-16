<?php


// options http://localhost/server/watch.php?dir=storage (wav)
// http://localhost/server/watch.php?dir=inspect (mp3)

include_once('config.inc.php');

$dir = getGET('dir', 'reception');

$route = array(
    'reception' => RECEPTION,
    'inspect' => INSPECT,
    'storage' => STORAGE
);

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
$temp->assign('dir', $dir);
$temp->assign('list', $list);
$temp->display('list.tpl');
die;
