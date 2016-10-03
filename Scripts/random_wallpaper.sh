#!/bin/sh 
USAGE="usage: $0 PATH1 [PATH2 [PATH3 [...]]] [-t DELAY] [-d DEFAULT]
  PATHn: the path of a picture or a directory of pictures
  DELAY: in seconds"
if [ $# -eq 0 ]; then
	echo $USAGE
	exit 1
fi

echo "Creating Temporary File..."
IDENTITY="WaLlPaPeR_ChAnGeR"
TEMP_FILE="/tmp/${IDENTITY}"
DEFAULT="/usr/share/slim/themes/default/background.jpg"
if ls "$TEMP_FILE" > /dev/null 2>&1; then
	echo "Unable to create the file because file exists, which means $0 has been running or killed uncorrectly."
	exit 1
fi
touch "$TEMP_FILE"
ON_QUIT() {
	pcmanfm --wallpaper-mode=color
	rm "$TEMP_FILE"
	exit 
}
trap ON_QUIT HUP INT QUIT TSTP

echo -n "Getting Pictures"

T_FLAG=0
D_FLAG=0
TIME=60
I_FILES=0
I_DIRS=0
for ARG in "$@"; do
	if [ $T_FLAG -eq 1 ]; then
		TIME="$ARG"
		T_FLAG=0
	elif [ "$ARG" == '-t' ]; then
		T_FLAG=1
	elif [ $D_FLAG -eq 1 ]; then
		DEFAULT="$ARG"
		D_FLAG=0
	elif [ "$ARG" == '-d' ]; then
		D_FLAG=1
	else
		TYPE=`file -b "$ARG"`
		WHETHER=`echo $TYPE | sed -e '/image|picture/ip' -`
		if [ "$TYPE" == "directory" ]; then
			DIRECTORIES[$I_DIRS]=$ARG
			I_DIRS=`expr $I_DIRS + 1`
		elif [ "$WHETHER" != "" ]; then
			echo -n "."
			FILES[$I_FILES]=$ARG
			I_FILES=`expr $I_FILES + 1`
		fi
	fi
done

for DIR in "${DIRECTORIES[@]}"; do
	ALL_IN_DIR=`ls "$DIR"`
	ALL_IN_DIR=`echo "$ALL_IN_DIR" | tr -s '\n' '/'`
	i=1
	FILE=`echo "$ALL_IN_DIR" | cut -d '/' -f $i | tr -d '\n'`
	while [ "$FILE" != "" ]; do
		TYPE=`file -b "$FILE"`
		WHETHER=`echo $TYPE | sed -e '/image|picture/ip' -`
		if [ "$WHETHER" != "" ]; then
			echo -n "."
			FILES[$I_FILES]="${DIR}/${FILE}"
			I_FILES=`expr $I_FILES + 1`
		fi
		i=`expr $i + 1`
		FILE=`echo "$ALL_IN_DIR" | cut -d / -f $i | tr -d '\n'`
	done
done

echo
echo "Pictures Loaded"
echo "You can input the commands below (with an Enter):"
echo "  n: Go to next random picture"
echo "  p: Pause until Enter"
echo "  q: Quit"
echo

pcmanfm --wallpaper-mode=fit

# We suppose the number of pictures are not more than 99999
while true; do
	I=`expr $RANDOM % $I_FILES`
	FILE="${FILES[$I]}"
	echo "Setting $FILE as wallpaper..."
	`pcmanfm --set-wallpaper "$FILE" > /dev/null 2>&1`
	read -t "$TIME" COMMAND
	if [ "$COMMAND" == "p" ]; then
		# Pause until ENTER
		pcmanfm --wallpaper-mode=color
		echo Paused. ENTER to continue.
		read
		pcmanfm --wallpaper-mode=fit
		`pcmanfm --set-wallpaper "$FILE" > /dev/null 2>&1`
	elif [ "$COMMAND" == "n" ]; then
		echo "Go to next picture."
		# continue
	elif [ "$COMMAND" == "q" ]; then
		echo "Exiting..."
		ON_QUIT
		exit
	fi
	COMMAND=""
done
