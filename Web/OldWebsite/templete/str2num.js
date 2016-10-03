
function b2n(str)
{
	var ret=0;
	for(var i=0;i!=str.length;++i)
	{
		tmp=0;
		switch (str[i])
		{
			case "1":
			++tmp;
			case "0":
				break;
			default:
				return Number.NaN;
		}
		ret*=2;
		ret+=tmp;
	}
	return ret;
}

function d2n(str)
{
	return Number(str);
}

function h2n(str)
{
	var ret=0;
	for(var i=0;i!=str.length;++i)
	{
		tmp=0;
		switch (str[i])
		{
			case "f":
			++tmp;
			case "e":
			++tmp;
			case "d":
			++tmp;
			case "c":
			++tmp;
			case "b":
			++tmp;
			case "a":
			++tmp;
			case "9":
			++tmp;
			case "8":
			++tmp;
			case "7":
			++tmp;
			case "6":
			++tmp;
			case "5":
			++tmp;
			case "4":
			++tmp;
			case "3":
			++tmp;
			case "2":
			++tmp;
			case "1":
			++tmp;
			case "0":
				break;
			default:
				return Number.NaN;
		}
		ret*=16;
		ret+=tmp;
	}
	return ret;
}

function n2b(num)
{
	var str="",ret="";
	var tmp=0;
	do
	{
		tmp=num%2;
		num-=tmp;
		num/=2;
		str+=tmp;
	}
	while(num)
	for(var i=str.length-1;i!=-1;--i)
	{
		ret+=str.charAt(i);
	}
	return ret;
}

function n2d(num)
{
	return num.toString();
}

function n2h(num)
{
	var str="",ret="";
	var tmp=0;
	do
	{
		tmp=num%16;
		num-=tmp;
		num/=16;
		str+=(tmp<10)?tmp:hexer(tmp-10);
	}
	while(num)
	for(var i=str.length-1;i!=-1;--i)
	{
		ret+=str.charAt(i);
	}
	return ret;
}

function hexer(num)
{
	switch (num)
	{
		case 0:
			return "a";
		case 1:
			return "b";
		case 2:
			return "c";
		case 3:
			return "d";
		case 4:
			return "e";
		case 5:
			return "f";
	}
}