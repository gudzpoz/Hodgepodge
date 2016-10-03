#!/bin/awk -f

BEGIN {
FS = ",";
}

work == 1 {
puzzle_name = substr($1, index($1, "\"") + 1, length($1) - 5);
gsub(/\s/, "");
level = $2;
menu[$2, puzzle[$2] + 1] = puzzle_name;
++puzzle[$2];
work = 0;
}

$0 ~ /puzzle\sname/ {
gsub(/\s/, "");
if($0 !~ /^\/\//)
	work = 1;
}

END {
print "[";
for(level = 0; level != length(puzzle); ++level)
{
	print "\t[";
	for(subn = 0; subn != puzzle[level]; ++subn)
		printf("\t\t\"%s\",\n", menu[level, subn + 1]);
	print "\t],";
}
print "]";
}

