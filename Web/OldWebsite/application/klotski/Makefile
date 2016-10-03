
#This file is part of Klotski.
#
#    Klotski is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    Klotski is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with Klotski.  If not, see <http://www.gnu.org/licenses/>.

OBJECT		=	klotski.html klotski.css klotski.js
JS			=	data.js menu.js move.js puzzle.js
MENU_NAME	=	menu

all			:	$(OBJECT)
	true

klotski.js	:	$(JS)
	cat $(JS) > klotski.js

menu.js		:	data.js generate_menu.awk
	cat GPL_header > menu.js
	echo const $(MENU_NAME) = >> menu.js
	awk -f generate_menu.awk data.js >> menu.js
	echo ';' >> menu.js

