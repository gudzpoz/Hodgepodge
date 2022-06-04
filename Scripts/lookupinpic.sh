#!/bin/sh 
xfce4-screenshooter -r -s /tmp/lookupinpic.png
tesseract -l chi_sim /tmp/lookupinpic.png /tmp/lookupinpic
goldendict "`cat /tmp/lookupinpic.txt`" &
rm /tmp/lookupinpic.png
rm /tmp/lookupinpic.txt
