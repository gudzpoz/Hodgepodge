window.onload=winLoad;

var answer=new Array();

var timerH;

function winLoad() {
	tableSudoku();
	document.getElementById("start").setAttribute("onclick","workOut();return false;");
	document.getElementById("check").setAttribute("onclick","checkAns();return false;");
	document.getElementById("mnum").setAttribute("onclick","makeNum();return false;");
}


function createInput(formN)
{
	var ret=document.createElement("input");
	ret.setAttribute("type","text");
	ret.setAttribute("form",formN);
	ret.setAttribute("maxlength","1");
	ret.setAttribute("onfocus","this.select();return false;")
	ret.value="";
	return ret;
}

function getRandom(toper)
{
	var ret=Math.random()*(toper);
	ret-=ret%1;
	return ret;
}

function getInput(Id)
{
	return document.getElementById(Id).getElementsByTagName("input")[0];
}

function whileA(str)
{
	if(str.length==0 || str.length==1)
	{
		return str;
	}
	return (str[str.length-1]+str.substring(0,str.length-1));
}

function nextLine(num)
{
	if(num==8)
	{
		return 9;
	}
	var ret=num+3;
	ret=((ret>8)?ret-8:ret);
	return ret;
}

function makeNum()
{
	var tmp=new Array(9);
	for(var i=0;i!=9;++i){tmp[i]=0;}
	for(var i=0;i!=9;++i)
	{
		var ii=getRandom(9);
		if(tmp[ii]!=0)
		{
			--i;
			continue;
		}
		tmp[ii]=i+1;
	}
	var ret="";
	for(var i=0;i!=9;++i)
	{
		ret+=tmp[i];
	}
	document.getElementById("rand").value=ret;
}

function workOut()
{
	var rand=document.getElementById("rand").value;
	
	var strNum=document.getElementById("num").value;
	var num=parseInt(strNum);
	if(strNum.length==0)
	{
		alert("The number of blacks can NOT be nothing.");
		return;
	}
	if (num<0 || num>81) {
		alert("The number of blanks MUST between 0 ang 81.");
		return;
	}
	if(rand.length!=9)
	{
		alert("The Sudoku Seed can ONLY be a nine-digit number.");
		return;
	}
	//0-3-6-1-4-7-2-5-8
	
	for(var i=0;i!=9;i=nextLine(i))
	{
		for(var ii=0;ii!=9;++ii)
		{
			var v=getInput(""+i+""+ii);
			v.value=rand.charAt(ii);
			answer[i*9+ii]=rand.charAt(ii);
			v.setAttribute("disabled","disable");
		}
		rand=whileA(rand);
	}
	
	for(var i=num;i!=0;--i)
	{
		var v=getInput(""+getRandom(9)+""+getRandom(9));
		if(v.value=="")
		{
		++i;
		continue;
		}
		v.value="";
		v.disabled=undefined;
	}
	document.getElementById("timer").value="0";
	timer();
}

function checkAns()
{
	var won=0;
	for(var i=0;i!=9;i=nextLine(i))
	{
		for(var ii=0;ii!=9;++ii)
		{
			var v=getInput(""+i+""+ii);
			if(v.value!=answer[i*9+ii])
			{
				v.style.color="#ff0000";
				won=1;
			}
			else
			{
				v.style.color="#000000";
			}
		}
	}
	if(won==0)
	{
		clearTimeout(timerH);
		alert("You Won The Game!");
	}
}

function timer()
{
	document.getElementById("timer").value=parseInt(document.getElementById("timer").value)+1;
	timerH=setTimeout("timer()",1000);
}

function tableSudoku()
{
	var tb=document.getElementById("bodier");
	for(var i=0;i!=9;++i)
	{
		var tr=document.createElement("tr");
		//id-s of tr-s are {x|0<=x<=8}
		tr.setAttribute("id",""+i);
		
		for(var ii=0;ii!=9;++ii)
		{
			if(ii!=0 && (ii%3)==0)
			{
				var td=document.createElement("td");
				td.setAttribute("class","left_border")
				tr.appendChild(td);
			}
			var td=document.createElement("td");
			td.setAttribute("id",""+ii+""+i);
			td.appendChild(createInput("form"));
			tr.appendChild(td);
		}
		
		tb.appendChild(tr);
		
		if(((i+1)%3)==0)
		{
			var tr1=document.createElement("tr");
			for(var iii=0;iii!=9+2;++iii)
			{
				tr1.appendChild(document.createElement("td"));
			}
			tb.appendChild(tr1);
		}
	}
	
}
