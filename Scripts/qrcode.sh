#!/bin/sh 
xfce4-screenshooter -r -s /tmp/qrcode.png
qtqr /tmp/qrcode.png
rm /tmp/qrcode.png
