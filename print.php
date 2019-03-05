<?php
require __DIR__ . '/vendor/autoload.php';
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;


$_GET = array();

foreach($argv as $key => $pair) {
    if ($key == 0) { //skip first element which is script name (test.php)
        continue;
    }

    list($key, $value) = explode(":", $pair);
    $_GET[$key] = $value;
    print $key;
    print $value;
}

$text_file = "/home/pi/quest_smith/story_text/".$_GET["story_follow_up"];

$myfile = fopen($text_file.".txt", "r") or die("Unable to open file!");
$section = fread($myfile,filesize($text_file.".txt"));
fclose($myfile);


$connector = new FilePrintConnector("/dev/usb/lp0");
$printer = new Printer($connector);
$printer -> text($section);
$printer -> cut();
$printer -> close();
