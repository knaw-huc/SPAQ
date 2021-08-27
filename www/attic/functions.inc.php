<?php

function print_array($ar)
{
    print "<pre>";
    print_r($ar);
    print "</pre>";
}



function getPOST($varnaam, $default = '')
{
    if (isset($_POST[$varnaam])) {
        return strip_tags($_POST[$varnaam]);
    } else {
        return $default;
    }
}

function getGET($varnaam, $default = '')
{
    if (isset($_GET[$varnaam])) {
        return strip_tags($_GET[$varnaam]);
    } else {
        return $default;
    }
}

function getCookie($varnaam, $default = '')
{
    if (isset($_COOKIE[$varnaam])) {
        return strip_tags($_COOKIE[$varnaam]);
    } else {
        return $default;
    }
}

function getRequestStrict($varnaam, $mogelijke_waardes, $default)
{
    // met de in_array test voorkomen we tampering met de url de isset gaat mis als special op '' staat of 0 is (offset) moet gerefactored worden
    if (isset($_REQUEST[$varnaam]) && in_array($_REQUEST[$varnaam], $mogelijke_waardes)) {
        $varnaam = $_REQUEST[$varnaam];
    } else {
        $varnaam = $default;
    }
    return strip_tags($varnaam);
}

