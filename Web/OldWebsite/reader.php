<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" href="./global.css" type="yexy/css" />
	<title>The Source Code Reader</title>
</head>

<body>
	<div>
		<object data="./header.html"></object>
	</div>
	
	<table>
		<tr>
			<td>Filename</td>
			<td>Size</td>
			<td>-</td>
		</tr>
		
<?php
function linkMake($href) {
	if (is_dir($href)) {
		$ret="<a href=\"reader.php?load=".urlencode($href."/")."\">View Files</a>";
	}
	if (is_file($href)) {
		$ret="<a href=\"filer.php?load=".urlencode($href)."\">Source Code</a>";
	}
	return $ret;
}

function cmp($s1,$s2) {
	if(is_dir($s1)) {
		if (is_dir($s2)) {
			return strcasecmp($s1, $s2);
		}
		return -1;
	}
	if (is_dir($s2)) {
		return 1;
	}
	return strcasecmp($s1, $s2);
}

function fileInfo($load) {
	$baseDir=opendir($load);
	$sorted=array(".","..");
	for ($i = 2; ($fileName=readdir($baseDir))!==false; ++$i) {
		if ($fileName[0]=='.') {
			--$i;
			continue;
		}
		$sorted[$i]=$fileName;
	}
	usort($sorted, "cmp");
	
	for ($i = 0; $i < count($sorted); ++$i) {
		$loadName=$load.$sorted[$i];
		echo("<tr>\n");
		echo("<td><a href=\"".$loadName."\">".$sorted[$i]."</a></td>\n");
		echo("<td>".filesize($loadName)."</td>\n");
		echo("<td>".linkMake($loadName,$sorted[$i])."</td>\n");
		echo("</tr>\n");
	}
	closedir($baseDir);
	clearstatcache();
}

$load="";
if (is_string(urldecode($_GET["load"]))) {
	$load=urldecode($_GET["load"]);
}

$arr=explode("/", $load);
if ($arr[count($arr)-2]==".") {array_splice($arr, -2, 1);
	$load=implode("/", $arr);
}

$arr=explode("/", $load);
if ($arr[count($arr)-2]=="..") {
	array_splice($arr, -3, 2);
	$load=implode("/", $arr);
}

if ($load=="") {
	$load="./";
}
fileinfo($load);

?>
	</table>
</body>
</html>