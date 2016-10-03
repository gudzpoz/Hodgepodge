
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

