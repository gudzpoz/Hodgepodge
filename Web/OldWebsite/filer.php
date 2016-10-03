<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" href="global.css" type="text/css" />
	<title>File Reader</title>
</head>

<body>
	<div>
		<object data="header.html"></object>
	</div>
	
	<code>
	<?php
		$load=urldecode($_GET["load"]);
		$arr=array();
		if (preg_match("/\/\.(.+)$/", $load)) {
			echo("<h1>Invalid Argument.</h1>");
			exit();
		}
		$file=fopen($load, "r");
		while (!feof($file)) {
			echo(nl2br(htmlspecialchars(fgets($file))));
		}
		fclose($file);
	?>
	</code>
</body>
</html>