<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/*
 * LimeSurvey
 * Copyright (C) 2007-2019 The LimeSurvey Project Team / Carsten Schmitz
 * All rights reserved.
 * License: GNU/GPL License v3 or later, see LICENSE.php
 * LimeSurvey is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYRIGHT.php for copyright notices and details.
 */

/* 
WARNING!!!
ONCE SET, ENCRYPTION KEYS SHOULD NEVER BE CHANGED, OTHERWISE ALL ENCRYPTED DATA COULD BE LOST !!!

*/

$config = array();
$config['encryptionnonce'] = '9cc90f5ea580ce0b6a590bc0b5a385b56bcacfbdc3cae2e5';
$config['encryptionsecretboxkey'] = '8878fcbc00d0ef4ab3a5d96249c680b42064f0823fc3c0d3455a8a2623809838';
return $config;