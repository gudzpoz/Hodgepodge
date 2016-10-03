
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
		select.appendChild(optgroup);
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
		var width = (100 / PUZZLE[PUZZLE_INDEX.WIDTH]) - 5 + '%';
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

