window.onload=winLoad;

//<script src="../templete/str2num.js" type="text/javascript"></script>

function winLoad() {
	document.getElementById("but_bin").setAttribute("onclick", "bin();return 0;");
	document.getElementById("but_dec").setAttribute("onclick", "dec();return 0;");
	document.getElementById("but_hex").setAttribute("onclick", "hex();return 0;");
	
}

function error(str, err) {
	var v=document.getElementById(str);
	v.style.color=(err==0)?"#000000":"#ff0000";
}

function reseter() {
	error("bin", 0);
	error("dec", 0);
	error("hex", 0);
}

function bin() {
	var num=b2n(document.getElementById("bin").value);
	if(isNaN(num))
	{
		error("bin", 1);
		return 0;
	}
	reseter();
	document.getElementById("dec").value=n2d(num);
	document.getElementById("hex").value=n2h(num);
}

function dec() {
	var num=d2n(document.getElementById("dec").value);
	if(isNaN(num))
	{
		error("dec", 1);
		return 0;
	}
	reseter();
	document.getElementById("bin").value=n2b(num);
	document.getElementById("hex").value=n2h(num);
}

function hex() {
	var num=h2n(document.getElementById("hex").value);
	if(isNaN(num))
	{
		error("hex", 1);
		return 0;
	}
	reseter();
	document.getElementById("dec").value=n2d(num);
	document.getElementById("bin").value=n2b(num);
}
