#!/bin/sh 
xfce4-screenshooter -r -s /tmp/scanscreen.png
tesseract -l chi_sim+eng /tmp/scanscreen.png /tmp/scanscreen
mousepad /tmp/scanscreen.txt
rm /tmp/scanscreen.png
rm /tmp/scanscreen.txt
