window.onload=winLoad;

hats=new Array();
players=new Array();
ans=new Array();
changes=0;

function winLoad()
{
	document.getElementById("next").setAttribute("disabled","disabled");
	document.getElementById("answer").setAttribute("disabled","disabled");
	document.getElementById("start").setAttribute("onclick","Init();return false;");
	document.getElementById("next").setAttribute("onclick","Next();return false;");
	document.getElementById("answer").setAttribute("onclick","Ans();return false;");
}

function deleteAll()
{
	document.getElementById("pics").innerHTML="";
	document.getElementById("picNum").innerHTML="";
}

function addPic(src,num,id)
{
	var pic=document.createElement("img");
	pic.setAttribute("src",src);
	if(id!="")
	{	pic.setAttribute("id",id);	}
	var td=document.createElement("td");
	td.appendChild(pic);
	document.getElementById("pics").appendChild(td);
	td=document.createElement("td");
	td.appendChild(document.createTextNode(num.toString()));
	document.getElementById("picNum").appendChild(td);
}

function addText(str,_id,p)
{
	var par=document.getElementById(_id);
	
	if(p)
	{
		var _tmp=document.createElement("p");
		par.appendChild(_tmp);
		par=_tmp;
	}
	
	var strN=document.createTextNode(str);
	
	par.appendChild(strN);
}

function printArr(arr)
{
	var str="";
	for(var i=0;i!=arr.length;++i)
	{
		str+=arr[i].toString()+"|-|";
	}
	str+="<br />";
	
	addText(str,"body",false);
}

function getRandom(toper)
{
	var ret=Math.random()*(toper);
	ret-=ret%1;
	return ret;
}

function makeNum(size)
{
	var tmp=new Array(size);
	for(var i=0;i!=size;++i){tmp[i]=-1;}
	for(var i=0;i!=size;++i)
	{
		var ii=getRandom(size);
		if(tmp[ii]!=-1)
		{
			--i;
			continue;
		}
		tmp[ii]=getRandom(2);
	}
	return tmp;
}

function Init()
{
	document.getElementById("answer").setAttribute("disabled","disabled");
	document.getElementById("body").innerHTML="";
	document.getElementById("next").disabled=undefined;
	ans=new Array(0);
	var v=parseInt(document.getElementById("hatNum").value);
	if(v==NaN)
	{	alert("Hats is not-a-num!");return;	}
	hats=makeNum(v);
	v=parseInt(document.getElementById("playerNum").value);
	if(v==NaN)
	{	alert("Players is not-a-num!");return;	}
	players=new Array(v);
	
	if(players.length>hats.length)
	{
		alert("There's no hats enough!");
		return;
	}
	
	for (var i = 0; i != players.length; i++) {
		players[i]=hats[i];
	}
	
	hats.zero=viewZero(-1,hats,0);
	
	deleteAll("td");
	for(var i=0;i!=players.length-1;++i)
	{
		if(players[i]==0)
		{	addPic("image/blueHat.png",i+1,"");	}
		else
		{	addPic("image/redHat.png",i+1,"");	}
	}
	addPic("image/unknown.png",players.length,"me");
	addText("There's "+hats.zero+" blue hats and "+(hats.length-hats.zero)+" red hats in all.","body",true)
}

function Next()
{
	if(ans.length==players.length)
	{	return;	}
	runner();
	if(ans.length==players.length)
	{
		alert("Please Guess The Color Of The Last Hat.");
		document.getElementById("answer").disabled=undefined;
		return;
	}
	
	
	var str="";
	if(ans[ans.length-1]==-1)
	{
	str="The "+ans.length+"th player don't know what color his hat is.";
	}
	else
	{
		str="The "+ans.length+"th player knows his hat is ";
		str+=(ans[ans.length-1]==0?"blue.":"red.")
	}
	
	addText(str,"body",true);
}

function Ans()
{
	var v=ans[ans.length-1];
	if(v==-1)
	{	alert("The Answer Cannot Be Think Out.");	}
	else
	{	alert("The Color Of The Last Hat Is "+((v==0)?"Blue.":"Red."));}
	
	if(ans[ans.length-1]==0)
	{
		document.getElementById("me").setAttribute("src","image/blueHat.png");
	}
	else if(ans[ans.length-1]==1)
	{
		document.getElementById("me").setAttribute("src","image/redHat.png");
	}
}

function viewZero(per,arr,num)
{
	var ret=0;
	for(var i=0;i!=arr.length;++i)
	{
		if(i==per)
		{	continue;	}
		if(arr[i]==num)
		{	++ret;	}
	}
	return ret;
}

function firstOne(per)
{
	if(viewZero(per,players,0)==hats.zero)
	{	return 1;	}
	if(viewZero(per,players,1)==(hats.length-hats.zero))
	{	return 0;	}
	return -1;
}

function returner(per)
{
	return 
}

function counter(per)
{
	var whom=(changes==10)?1:0;
	if(changes==10)
	{	changes=0;	}
	var v=firstOne(per);
	if(v!=-1)
	{	return v;	}
	if(per==0)
	{	return -1;	}
	
	if(players[per]==0)
	{	players[per]=1;	}
	else
	{	players[per]=0;	}
	
	v=counter(per-1);
	
	if(players[per]==0)
	{	players[per]=1;	}
	else
	{	players[per]=0;	}
	
	if(v!=ans[per-1])
	{	changes=1;	}
	
	v=counter(per-1);
	
	if(v!=ans[per-1])
	{	changes=1;	}
	
	if(changes==1)
	{
		return players[per];
	}
	
	return -1;
}

function runner()
{
	changes=10;
	ans[ans.length]=counter(ans.length);
}
