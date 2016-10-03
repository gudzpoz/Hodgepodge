
/*

This file is part of Klotski.

    Klotski is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Klotski is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Klotski.  If not, see <http://www.gnu.org/licenses/>.

*/

const PUZZLE_INDEX = 
{
	NAME: 0,
	LEVEL: 1,
	WIDTH: 2,
	HEIGHT: 3,
	LEAST: 4,
	DATA: 5,
};

const data = [
  /* puzzle name */
  ["Not Only 18 Steps", 0,
   6, 9, 18,
   "######",
   "#a**b#",
   "#m**n#",
   "#cdef#",
   "#ghij#",
   "#k  l#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Daisy", 0,
   6, 9, 28,
   "######",
   "#a**b#",
   "#a**b#",
   "#cdef#",
   "#zghi#",
   "#j  k#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Violet", 0,
   6, 9, 27,
   "######",
   "#a**b#",
   "#a**b#",
   "#cdef#",
   "#cghi#",
   "#j  k#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Poppy", 0,
   6, 9, 40,
   "######",
   "#a**b#",
   "#a**b#",
   "#cdde#",
   "#fghi#",
   "#j  k#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Pansy", 0,
   6, 9, 28,
   "######",
   "#a**b#",
   "#a**b#",
   "#cdef#",
   "#cghf#",
   "#i  j#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Snowdrop", 0,
   6, 9, 46,
   "######",
   "#a**b#",
   "#a**b#",
   "#cdde#",
   "#cfgh#",
   "#i  j#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name - sometimes called "Le'Ane Rouge" */
  ["Red Donkey", 0,
   6, 9, 81,
   "######",
   "#a**b#",
   "#a**b#",
   "#cdde#",
   "#cfge#",
   "#h  i#",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Trail", 0,
   6, 9, 102,
   "######",
   "#a**c#",
   "#a**c#",
   "#eddg#",
   "#hffj#",
   "# ii #",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Ambush", 0,
   6, 9, 120,
   "######",
   "#a**c#",
   "#d**e#",
   "#dffe#",
   "#ghhi#",
   "# jj #",
   "##--##",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Agatka", 1,
   7, 7, 30,
   "..     ",
   ".      ",
   "#####--",
   "#**aab-",
   "#*ccde#",
   "#fgh  #",
   "#######"],

  /* puzzle name */
  ["Success", 1,
   9, 6, 25,
   "#######  ",
   "#**bbc#  ",
   "#defgh#  ",
   "#ijkgh-  ",
   "#llk  #  ",
   "#######.."],

  /* puzzle name */
  ["Bone", 1,
   6, 9, 14,
   "######",
   "#abc*#",
   "# dd*#",
   "# ee*#",
   "# fgh#",
   "##-###",
   "     .",
   "     .",
   "     ."],

  /* puzzle name */
  ["Fortune", 1,
   7, 10, 25,
   "     ..",
   "     . ",
   "####-. ",
   "#ab  - ",
   "#ccd # ",
   "#ccd # ",
   "#**ee# ",
   "#*fgh# ",
   "#*iih# ",
   "###### "],

  /* puzzle name */
  ["Fool", 1,
   10, 6, 29,
   "  ########",
   "  -aabc  #",
   "  #aabdef#",
   "  #ijggef#",
   "  #klhh**#",
   "..########"],

  /* puzzle name */
  ["Solomon", 1,
   7, 9, 29,
   " .     ",
   "..     ",
   "#--####",
   "#  aab#",
   "# cdfb#",
   "#hcefg#",
   "#hijk*#",
   "#hll**#",
   "#######"],

  /* puzzle name */
  ["Cleopatra", 1,
   6, 8, 32,
   "######",
   "#abcd#",
   "#**ee#",
   "#f*g #",
   "#fh i-",
   "####--",
   "    ..",
   "     ."],

  /* puzzle name */
  ["Shark", 1,
   11, 8, 0,
   /* SOLVEME */
   "########   ",
   "#nrr s #   ",
   "#n*op q#   ",
   "#***jml#   ",
   "#hhijkl#   ",
   "#ffcddg-   ",
   "#abcdde- . ",
   "########..."],

  /* puzzle name */
  ["Rome", 1,
   8, 8, 38,
   "########",
   "#abcc**#",
   "#ddeef*#",
   "#ddghfi#",
   "#   jki#",
   "#--#####",
   " ..     ",
   "  .     "],

  /* puzzle name */
  ["Pennant Puzzle", 1,
   6, 9, 59,
   "######",
   "#**aa#",
   "#**bb#",
   "#de  #",
   "#fghh#",
   "#fgii#",
   "#--###",
   "    ..",
   "    .."],

  /* puzzle name */
  ["Ithaca", 2,
   19, 19, 0,
   /* SOLVEME */
   ".aaaaaaaaaaaaaaaaab",
   "..  cddeffffffffffb",
   " .. cddeffffffffffb",
   "  . cddeffffffffffb",
   "ggg-############hhb",
   "ggg-  ABCDEFFGH#hhb",
   "ggg-       FFIJ#hhb",
   "ggg#       KLMJ#hhb",
   "ggg#NNNNOOOPQMJ#hhb",
   "ggg#NNNNOOOP*RS#hhb",
   "ggg#TTTTTUVW**X#hhb",
   "ggg#YZ12222W3**#hhb",
   "ggg#YZ12222W34*#iib",
   "jjj#YZ155555367#klb",
   "jjj#############mmb",
   "jjjnooooooooooppppb",
   "jjjqooooooooooppppb",
   "       rrrssssppppb",
   "ttttttuvvvvvvvwwwwx"],

  /* puzzle name */
  ["Pelopones", 2,
   9, 8, 0,
   /* SOLVEME */
   "#########",
   "#abbb***#",
   "#abbb*c*#",
   "#adeefgg#",
   "#  eefhh#",
   "#... ihh#",
   "#. . ihh#",
   "#########"],

  /* puzzle name */
  ["Transeuropa", 2,
   15, 8, 0,
   /* SOLVEME */
   "    ###########",
   "    -AAAAABBCC#",
   "    -   DEFGHI#",
   "    #   DEFGJI#",
   "    #   KEFGLI#",
   "    #   KEFG*I#",
   "  . #   MM****#",
   "....###########"],

  /* puzzle name */
  ["Lodzianka", 2,
   9, 7, 0,
   /* SOLVEME */
   "#########",
   "#**abbcc#",
   "#**abbdd#",
   "#eefgh  #",
   "#iiijk..#",
   "#iiijk..#",
   "#########"],

  /* puzzle name */
  ["Polonaise", 2,
   7, 7, 0,
   /* SOLVEME */
   "#######",
   "#aab**#",
   "#aabc*#",
   "#defgg#",
   "#..fhh#",
   "# .ihh#",
   "#######"],

  /* puzzle name */
  ["Baltic Sea", 2,
   6, 8, 42,
   "######",
   "#.abc#",
   "#.dec#",
   "#fggc#",
   "#fhhi#",
   "#fjk*#",
   "#flk*#",
   "######"],

  /* puzzle name */
  ["American Pie", 2,
   10, 12, 0,
   /* SOLVEME */
   "##########",
   "#a*bcdefg#",
   "#**bhhhhg#",
   "#*iijjkkg#",
   "#liimnoop#",
   "#qiirrr  #",
   "#qstuvv  #",
   "#qwwxvv  #",
   "######--##",
   "         .",
   "        ..",
   "        . "],

  /* puzzle name */
  ["Traffic Jam", 2,
   10, 7, 132,
   "########  ",
   "#** ffi#  ",
   "#** fgh#  ",
   "#aacehh#  ",
   "#bbdjlm-  ",
   "#bddklm-..",
   "########.."],

  /* puzzle name */
  ["Sunshine", 2,
   17, 22, 345,
   "       ...       ",
   "      .. ..      ",
   "      .   .      ",
   "      .. ..      ",
   "       ...       ",
   "######-----######",
   "#hh0iilltmmpp;qq#",
   "#hh,iill mmpp:qq#",
   "#2y{45v s w89x/z#",
   "#jj6kkaa nnoo<rr#",
   "#jj7kkaaunnoo>rr#",
   "#33333TTJWW11111#",
   "#33333TTJWW11111#",
   "#33333GG HH11111#",
   "#33333YYIgg11111#",
   "#33333YYIgg11111#",
   "#ddFeeA***BffOZZ#",
   "#ddFee** **ffOZZ#",
   "#MMKQQ*   *PPS^^#",
   "#VVLXX** **bbRcc#",
   "#VVLXXD***EbbRcc#",
   "#################"]
];

/*
This file is part of Klotski.

    Klotski is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Klotski is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Klotski.  If not, see <http://www.gnu.org/licenses/>.
*/

const menu =
[
	[
		"Not Only 18 Steps",
		"Daisy",
		"Violet",
		"Poppy",
		"Pansy",
		"Snowdrop",
		"Red Donkey",
		"Trail",
		"Ambush",
	],
	[
		"Agatka",
		"Success",
		"Bone",
		"Fortune",
		"Fool",
		"Solomon",
		"Cleopatra",
		"Shark",
		"Rome",
		"Pennant Puzzle",
	],
	[
		"Ithaca",
		"Pelopones",
		"Transeuropa",
		"Lodzianka",
		"Polonaise",
		"Baltic Sea",
		"American Pie",
		"Traffic Jam",
		"Sunshine",
	],
]
;

var text;
var x, y;
var clicked = 0;

const DIRE = 
{
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3,
	NONE: 15,
};

function getTarget(event)
{
	return event.srcElement?event.srcElement:event.target; //f*ck IE
}

function autoDire(event, x, y)
{
	var xm = event.clientX, ym = event.clientY;
	var direX = x - xm, direY = y - ym;
	if(Math.abs(direX) == Math.abs(direY))
		return DIRE.NONE;
	if(Math.abs(direX) < Math.abs(direY))
	{
		if(direY > 0)
			return DIRE.UP;
		else
			return DIRE.DOWN;
	}
	else
	{
		if(direX > 0)
			return DIRE.LEFT;
		else
			return DIRE.RIGHT;
	}
}

function MouseDown(event)
{
	if(clicked == 1)
		return;
	var target = getTarget(event);
	text = target.getAttribute("class");
	x = event.clientX;
	y = event.clientY;
	clicked = 1;
}

function MouseUp(event)
{
	if(clicked == 0)
		return;
	var dire = autoDire(event, x, y);
	if(document.selection)
		document.selection.empty();
	else if(window.getSelection)
		window.getSelection().removeAllRanges();
	if(clicked && canMove(text, dire))
	{
		doMove(text, dire);
		++times;
		document.getElementById("times").innerHTML = "times: " + times;
	}
	clicked = 0;
}

function MouseMove(event)
{
//	var dire = autoDire(event, x, y);
//	if(clicked && canMove(text, dire))
//		doMove(text, dire);
}

function mapGetText(row, col)
{
	if(puzzle_map[row] != undefined)
		return puzzle_map[row][col];
	return undefined;
}

function canMove(text, dire)
{
	var seat = seats[text2order[text]];
	if(dire == DIRE.NONE)
		return false;
	if(dire == DIRE.UP)
	{
		for(var i = 0; i != seat.length; ++i)
		{
			var tmp = seat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row - 1, col) != ' ' && mapGetText(row - 1, col)!= text)
				return false;
		}
	}
	else if(dire == DIRE.DOWN)
	{
		for(var i = 0; i != seat.length; ++i)
		{
			var tmp = seat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row + 1, col) != ' ' && mapGetText(row + 1, col)!= text)
				return false;
		}
	}
	else if(dire == DIRE.LEFT)
	{
		for(var i = 0; i != seat.length; ++i)
		{
			var tmp = seat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row, col - 1)!= ' ' && mapGetText(row, col - 1) != text)
				return false;
		}
	}
	else if(dire == DIRE.RIGHT)
	{
		for(var i = 0; i != seat.length; ++i)
		{
			var tmp = seat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row, col + 1)!= ' ' && mapGetText(row, col + 1) != text)
				return false;
		}
	}
	return true;
}

function doMove(text, dire)
{
	var copySeat = new Array(), seat = seats[text2order[text]];
	for(var i = 0; i != seat.length; ++i)
		copySeat[i] = seat[i];
	
	var i = 0;
	if(dire == DIRE.UP)
	{
		while(copySeat.length)
		{
			var tmp = copySeat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row - 1, col)!= ' ')
			{
				++i;
				i %= copySeat.length;
				continue;
			}
			
			var tdOld = document.getElementById(row + " " + col);
			var tdNew = document.getElementById((row - 1) + " " + col);
			var childOld = tdOld.lastChild;
			var childNew = tdNew.lastChild;
			tdOld.removeChild(tdOld.lastChild);
			tdNew.removeChild(tdNew.lastChild);
			tdOld.appendChild(childNew);
			tdNew.appendChild(childOld);
			var ii;
			for(ii = 0; ii != seat.length; ++ii)
			{
				if(seat[ii] == copySeat[i])
					break;
			}
			seat[ii] = (row - 1) + " " + col;
			puzzle_map[row - 1][col] = text;
			puzzle_map[row][col] = ' ';
			copySeat.splice(i, 1);
			i %= copySeat.length;
		}
	}
	else if(dire == DIRE.DOWN)
	{
		while(copySeat.length)
		{
			var tmp = copySeat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row + 1, col)!= ' ')
			{
				++i;
				i %= copySeat.length;
				continue;
			}
			
			var tdOld = document.getElementById(row + " " + col);
			var tdNew = document.getElementById((row + 1) + " " + col);
			var childOld = tdOld.lastChild;
			var childNew = tdNew.lastChild;
			tdOld.removeChild(tdOld.lastChild);
			tdNew.removeChild(tdNew.lastChild);
			tdOld.appendChild(childNew);
			tdNew.appendChild(childOld);
			var ii;
			for(ii = 0; ii != seat.length; ++ii)
			{
				if(seat[ii] == copySeat[i])
					break;
			}
			seat[ii] = (row + 1) + " " + col;
			puzzle_map[row + 1][col] = text;
			puzzle_map[row][col] = ' ';
			copySeat.splice(i, 1);
			i %= copySeat.length;
		}
	}
	else if(dire == DIRE.LEFT)
	{
		while(copySeat.length)
		{
			var tmp = copySeat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row, col - 1)!= ' ')
			{
				++i;
				i %= copySeat.length;
				continue;
			}
			
			var tdOld = document.getElementById(row + " " + col);
			var tdNew = document.getElementById(row + " " + (col - 1));
			var childOld = tdOld.lastChild;
			var childNew = tdNew.lastChild;
			tdOld.removeChild(tdOld.lastChild);
			tdNew.removeChild(tdNew.lastChild);
			tdOld.appendChild(childNew);
			tdNew.appendChild(childOld);
			var ii;
			for(ii = 0; ii != seat.length; ++ii)
			{
				if(seat[ii] == copySeat[i])
					break;
			}
			seat[ii] = row + " " + (col - 1);
			puzzle_map[row][col - 1] = text;
			puzzle_map[row][col] = ' ';
			copySeat.splice(i, 1);
			i %= copySeat.length;
		}
	}
	else if(dire == DIRE.RIGHT)
	{
		while(copySeat.length)
		{
			var tmp = copySeat[i].split(' ');
			var row = new Number(tmp[0]), col = new Number(tmp[1]);
			if(mapGetText(row, col + 1)!= ' ')
			{
				++i;
				i %= copySeat.length;
				continue;
			}
			
			var tdOld = document.getElementById(row + " " + col);
			var tdNew = document.getElementById(row + " " + (col + 1));
			var childOld = tdOld.lastChild;
			var childNew = tdNew.lastChild;
			tdOld.removeChild(tdOld.lastChild);
			tdNew.removeChild(tdNew.lastChild);
			tdOld.appendChild(childNew);
			tdNew.appendChild(childOld);
			var ii;
			for(ii = 0; ii != seat.length; ++ii)
			{
				if(seat[ii] == copySeat[i])
					break;
			}
			seat[ii] = row + " " + (col + 1);
			puzzle_map[row][col + 1] = text;
			puzzle_map[row][col] = ' ';
			copySeat.splice(i, 1);
			i %= copySeat.length;
		}
	}
}


//this vars are for move.js
var text2order = {};
var seats = new Array(1); //the array is of arrays
var puzzle_map = new Array(); //the array is of arrays //can be change
var times = 0;

var PUZZLE; //mustn't be changed ( part of DATA )

var oldonload = window.onload;
if (typeof window.onload != 'function')
{
	window.onload = html_init;
}
else
{
	window.onload = function()
	{
		oldonload();
		html_init();
	}
}

function html_init()
{
	var select = document.createElement("select");
	var button = document.createElement("button");
	select.setAttribute("id", "select");
	for(var level = 0; level != menu.length; ++level)
	{
		var optgroup =  document.createElement("optgroup");
		optgroup.setAttribute("label", "Level " + level);
		for(var subn = 0; subn != menu[level].length; ++subn)
		{
			var option = document.createElement("option");
			option.appendChild(document.createTextNode(menu[level][subn]));
			optgroup.appendChild(option);
		}
		select.add(optgroup, null);
	}
	document.getElementsByTagName("body")[0].insertBefore(select, document.getElementById("main"));
	
	button.appendChild(document.createTextNode("Start"));
	button.setAttribute("onclick", "create_puzzle(document.getElementById('select'))");
	document.getElementsByTagName("body")[0].insertBefore(button, document.getElementById("main"));
}

function create_puzzle(select)
{
	function getText(row, col)
	{
		if(PUZZLE[PUZZLE_INDEX.DATA + row] != undefined)
			return PUZZLE[PUZZLE_INDEX.DATA + row][col];
			return undefined;
	}
	var setStyle = function(ele, row, col)
	{
		var width = (100 / PUZZLE[PUZZLE_INDEX.WIDTH]) + '%';
		var text = getText(row, col);
		if(text == ' ')
			return;
		ele.style.borderStyle = 'solid';
		ele.style.borderWidth = '5px';
		if(getText(row - 1, col) != text)
			ele.style.borderTopColor = '#00ff00';
		else
			ele.style.borderTopColor = '#0000ff';
		if(getText(row + 1, col) != text)
			ele.style.borderBottomColor = '#00ff00';
		else
			ele.style.borderBottomColor = '#0000ff';
		if(getText(row, col - 1) != text)
			ele.style.borderLeftColor = '#00ff00';
		else
			ele.style.borderLeftColor = '#0000ff';
		if(getText(row, col + 1) != text)
			ele.style.borderRightColor = '#00ff00';
		else
			ele.style.borderRightColor = '#0000ff';
		ele.style.backgroundColor = '#0000ff';
		ele.parentNode.style.width = width;
		ele.style.width = "100%";
		ele.style.textAlign = "center";
		ele.innerHTML = "<br />" + text + "<br />";
		ele.setAttribute("class", text);
	}
	var puzzle_name = select.options[select.selectedIndex].text;
	times = 0;
	text2order = {};
	seats = new Array(1); //to avoid !(0) is true
	puzzle_map = new Array();
	document.getElementsByTagName("html")[0].setAttribute("onmousemove", "MouseMove(event)");
	document.getElementsByTagName("html")[0].setAttribute("onmouseup", "MouseUp(event)");
	
	for(var i = 0; i != data.length; ++i)
	{
		if(data[i][PUZZLE_INDEX.NAME] == puzzle_name)
		{
			PUZZLE = data[i];
			break;
		}	
	}
	
	var div = document.getElementById("main");
	while(div.lastChild != null)
	{
		div.removeChild(div.lastChild);
	}
	
	var h2 = document.createElement("h2");
	h2.appendChild(document.createTextNode(puzzle_name));
	div.appendChild(h2);
	
	var h3 = document.createElement("h3");
	h3.innerHTML = "times: 0";
	h3.setAttribute("id", "times");
	div.appendChild(h3);
	
	var table = document.createElement("table");
	for(var row = 0; row != PUZZLE[PUZZLE_INDEX.HEIGHT]; ++row)
	{
		var tr = document.createElement("tr");
		for(var col = 0; col != PUZZLE[PUZZLE_INDEX.WIDTH]; ++col)
		{
			var td = document.createElement("td");
			var p = document.createElement("p");
			td.appendChild(p);
			tr.appendChild(td);
			td.setAttribute("id", row + " " + col);
			setStyle(p, row, col);
			
			var text = getText(row, col);
			
			if(!puzzle_map[row])
				puzzle_map[row] = new Array();
			puzzle_map[row][col] = text;
			
			if(text == ' ' || text == '#' || text == '.' || text == '-')
				continue;
			if(!text2order[text])
				text2order[text]= seats.length;
			if(!seats[text2order[text]])
				seats[text2order[text]] = new Array();
			var seat = seats[text2order[text]];
			seat[seat.length] = row + " " + col;
			p.setAttribute("onmousedown", "MouseDown(event)");
			//p.setAttribute("onmouseup", "MouseUp(event)"); //using html.onmousemove to be stable
			//p.setAttribute("onmousemove", "MouseMove(event)"); //using html.onmousemove to be stable
		}
		table.appendChild(tr);
	}
	div.appendChild(table);
}

