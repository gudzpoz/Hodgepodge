#!/bin/sh 
USAGE="usage: $0 <+|-> [step]"
SCREEN_FOLDER="/sys/class/backlight"

if [ $# -eq 0 ]; then
	echo $USAGE
	exit 1
fi

if [ $# -eq 1 ]; then
	step=1
elif [ $# -eq 2 ]; then
	step=$2
else
	echo $USAGE
	exit 1
fi

i=1
all_screen=`ls $SCREEN_FOLDER | tr '\n' ' ' | sed -e 's/ +/ /g' -`
current=`echo "$all_screen" | cut -d ' ' -f $i`
while [ "$current" != "" ]
do
	brightness=`cat ${SCREEN_FOLDER}/${current}/brightness`
	if [ $brightness != "0" ]; then
		if [ $brightness != "" ]; then
			brightness=`expr $brightness $1 $step`
			`echo $brightness > ${SCREEN_FOLDER}/${current}/brightness`
		fi
	fi

	i=`expr $i + 1`
	current=`echo "$all_screen" | cut -d ' ' -f $i`
	current=`echo "$current" | sed -e 's/[[:space:]]//g' -`
done
