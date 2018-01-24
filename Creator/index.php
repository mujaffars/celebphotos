<?php


echo '<pre>';
print_r($_POST);
echo '</pre>';

echo '<pre>';
$jsonObj = json_decode($_POST['jsonString']);
echo '</pre>';

$txt = $_POST['jsonString'].",";
$myfile = file_put_contents('js/1to50.html', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);

$myfile = fopen("files/".$jsonObj->pzlUniqueKey.".html", "w") or die("Unable to open file!");
$txt = $_POST['txtImgData'];
fwrite($myfile, $txt);
fclose($myfile);