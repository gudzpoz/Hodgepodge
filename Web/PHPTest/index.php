<html>
  <head>
    <title>A Page for Learning PHP</title>
    <?php
      $file = "";
      if(array_key_exists("file", $_POST) && !empty($_POST["file"])) {
        $file = $_POST["file"];
        $script = "<script>window.phpFile = '$file';</script>\n";
        echo $script;
      }
      else {
        $file = "test.php";
      }
    ?>
    <script type="text/javascript" src="index.js"></script>
    <script type="text/javascript" src="src/ace.js"></script>
    <style>
      body {
        background-color: #f0f8ff;
        font-family: "Open Sans",sans-serif;
      }
      div#editor {
        height: 100%;
      }
      div.left {
        float: left;
        width: 50%;
      }
      div.right {
        position: absolute;
        float: left;
        left: 50%;
        width: 49%;
        height: 100%;
      }
      textarea#code {
        width: 100%;
        height: 100%;
      }
      iframe {
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="left">
      <form action="index.php" method="post" target="_blank">
	<input type="text" name="file"></input>
        <input type="submit" name="new" id="new" value="Open New File"></input>
      </form>
      <form id="form" action="index.php" method="post">
        <input type="submit" id="submit"></input>
	<input type="text" style="display: none;" name="file" value=<?php echo "\"$file\""; ?>></input>
        <div id="current">Current File: <?php echo $file; ?></div>
        <textarea id="code" name="code"><?php
          if(!array_key_exists("code", $_POST)) {
            $fileName = "example.php";
            $handle = fopen($fileName, "r");
            $contents = fread($handle, filesize($fileName));
            echo($contents);
            fclose($handle);
          }
          else {
            $handle = fopen($file, "w");
            fwrite($handle, $_POST["code"]);
            fclose($handle);
            echo($_POST["code"]);
          }
        ?></textarea>
        <div id="editor"></div>
      </form>
    </div>
    <div class="right">
      <iframe id="frame" 
        src="<?php
          if(array_key_exists("code", $_POST))
            { echo($file); }
          else
            { echo("example.php"); } ?>"
      ></iframe>
    </div>
  </body>
</html>
