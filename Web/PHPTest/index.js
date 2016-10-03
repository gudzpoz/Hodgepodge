handle = null;
window.onload = function() {
    // If JavaScript is available, the code below will replace the default textarea with ACE code editor. */
    document.getElementById("code").setAttribute("style", "display: none;");
    // Initializing ACE Editor
    handle = ace.edit("editor");
    handle.getSession().setMode("ace/mode/php");
    handle.setTheme("ace/theme/dawn");
    handle.getSession().setUseWrapMode(true);
    handle.getSession().setValue(document.getElementById("code").value); // For our PHP code will put the code in the textarea with id "code" ...

    // If JavaScript is available, don't submit the content but use AJAX instead.
    var form = document.getElementById("form");
    form.setAttribute("onsubmit", "return onSubmit()");

    // The value "window.file" will be set if the current file is an new opened file.
    if(window.phpFile == null || window.phpFile == "") {
	window.phpFile = "test.php";
    }
};

function onSubmit() {
    var code = getCode();
    var request = new XMLHttpRequest();
    var arg = new FormData();
    arg.append("code", code);
    arg.append("file", window.phpFile);
    request.responseType = "";
    request.open("POST", "ajax.php", false);
    request.send(arg);
    document.getElementById("frame").setAttribute("src", request.response.toString());
    return false;
}

function getCode() {
    return handle.getValue();
}
