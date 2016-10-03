//don't use the id of "_tmp"
//include "insertAfter.js"

function deleteIt(vId)
{
	var v=document.getElementById(vId);
	v.parentNode.removeChild(v);
	return null;
}

function deleteThem(vId)
{
	while(document.getElementById(vId))
	{
		deleteIt(vId);
	}
	return null;
}

function outside(num)
{
	if(num<0)
	{
		if( num%1 == 0 )
		{
			return num;
		}
		return num-(num%1)-1;
	}
	else
	{
		if( num%1 == 0 )
		{
			return num;
		}
		return num-(num%1)+1;
	}
}

pic="";

//for cL() to callBack
function doIt()
{
	deleteThem("_tmp");
	
	document.getElementById(pic).style.position="static";
}

callBack=doIt;

function changePic(picId,picLink,wid,hei,once)
{
	//save things for doIt()
	pic=picId;
	
	var p;
	//get the pic will be changed
	if(document.getElementById("_tmp"))
	{
		p=document.getElementById("_tmp");
		deleteThem("pic");
	}
	else
	{
		p=document.getElementById(picId);
		p.setAttribute("id","_tmp");
	}
	//p.style.position="absolute";
	if(!(p.style.left))
	{
		p.style.left="0px";
	}
	if(!(p.style.top))
	{
		p.style.top="0px";
	}
	var x_ptr=parseInt(p.style.left)+wid;
	var y_ptr=parseInt(p.style.top);
	//new and set the new "<img>" location
	var n=document.createElement("img");
	n.setAttribute("src",picLink);
	n.setAttribute("id",picId);
	n.style.width=wid+"px";
	n.style.height=hei+"px";
	n.style.position="absolute";
	n.style.left=x_ptr+"px";
	n.style.top=y_ptr+"px";
	p.parentNode.insertBefore(n,p);
	cL(picId,parseInt(p.style.left),parseInt(p.style.top),once);
	return false;
}


//cL means c-hange L-ocation
function cL(objId,tx,ty,once)
{
	var v=document.getElementById(objId);
	if(v.timer)
	{
		clearTimeout(v.timer);
	}
	if(!v.style.left)
	{	v.style.left="0px";	}
	if(!v.style.top)
	{	v.style.top="0px";	}
	var xp = parseInt(v.style.left);
	var yp = parseInt(v.style.top);
	if(xp==tx && yp==ty)
	{
		callBack();
		return 0;
	}
	xp += outside((tx - xp)/10);
	yp += outside((ty - yp)/10);
	v.style.left=xp+"px";
	v.style.top=yp+"px";
	var tmp="cL('"+objId+"',"+tx+","+ty+","+once+")";
	v.timer=setTimeout(tmp,once);
}