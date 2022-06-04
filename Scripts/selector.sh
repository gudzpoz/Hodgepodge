#!/bin/sh
USAGE="usage: $0 <mirror_site_address_with_http>"

if [ $# -eq 0 ]; then
    echo $USAGE
    exit 1
fi

ECHO="-e"
if [ "`echo -n $ECHO`" = "$ECHO" ]; then
    ECHO=""
fi

if [ $UID -ne 0 ]; then
    sudo $0 "$@"
    exit 0
fi

mirror=`echo $1 | sed -e 's#/$##g'`
mirror_name=`echo $mirror | sed -e 's#^http\(s\)\?://##g'`
script_name=`echo $0 | sed -e 's#^.*/##g'`
file="/tmp/${script_name}"
trap true 2 # SIGINT
# ping $mirror_name -c 2 -W 1
# if [ $? -ne 0 ]; then
#     echo "Mirror not available."
#     exit 1
# fi
echo $ECHO "\033[1;30;37m Getting CSV file... \033[0m";
wget "$mirror/api/iphone/" -O $file
if [ $? -ne 0 ]; then
    echo $ECHO "\033[1;30;41m Mirror not available. \033[0m"
    exit 1
fi
hint=""
while read line
do
    echo $ECHO "\033[1;30;37m Press Ctrl-C to exit. \033[0m"
    trap 2
    sleep 1
    trap true 2
    echo $ECHO "\033[1;30;37m Press Ctrl-C twice to exit. \033[0m"
    first=`echo $line | cut -c 1`
    if [ "$first" = "*" ]; then
	continue
    fi
    if [ "$first" = "#" ]; then
	hint=$line
	continue
    fi
    ip=`echo $line | cut -d , -f 2`
    ping $ip -c 2 -W 1
    if [ $? -ne 0 ]; then
	continue
    fi
    base64=`echo $line | cut -d , -f 15`
    echo $base64 | base64 --decode > /tmp/${script_name}.ovpn
    echo $ECHO "\033[1;30;37m"
    echo $hint
    echo $line | cut -d , -f 1-14
    echo $ECHO "\033[0m"
    openvpn /tmp/${script_name}.ovpn &
    wait
done < $file
