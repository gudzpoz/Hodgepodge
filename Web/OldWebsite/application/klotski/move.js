
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

