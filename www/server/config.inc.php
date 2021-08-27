<?php

// keep error_reporting and displayerrors on for development

error_reporting(E_ALL);
ini_set("display_errors", 1);
include_once('functions.inc.php');

define('APP_DIR', __DIR__ . '/'); // absolute path to current directory
define('RECEPTION', APP_DIR . 'reception/'); // what's recorded, temporary (format of the browser)
define('INSPECT', APP_DIR . 'inspect/'); // for previews and checks (mp3 or aac)
define('STORAGE', APP_DIR . 'storage/'); // for long term storage wav or flac

define('LIBS', APP_DIR . 'libs/');
include_once(realpath(LIBS . 'smarty/libs/Smarty.class.php')); // Smarty3
define('LOG_DIR', APP_DIR . 'logs/');

define('TITLE', 'SPAQ back-end');
define('SUBTITLE', 'audio files');


// TEMPLATE CONFIGURATION
class Smarty_Specifiek extends Smarty {
    public function __construct() {
        parent::__construct();
        $smartie_dir = './';
        $this->error_reporting = error_reporting() & ~E_NOTICE & ~E_WARNING; 
        $this->template_dir = $smartie_dir . 'templates/';
        $this->compile_dir = $smartie_dir . 'templates_c/';
        $this->config_dir = $smartie_dir . 'configs/';
        $this->cache_dir = $smartie_dir . 'cache/';
        $this->caching = false;
        $this->assign('app_name', TITLE);
    }
}