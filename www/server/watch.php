<?php

include_once('config.inc.php');

$dir = 'reception';
$list = array();

if ($handle = opendir(RECEPTION)) {
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
