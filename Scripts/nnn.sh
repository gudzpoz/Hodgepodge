#!/bin/sh 
USAGE="$0 <NS name> <VETH name1> <VETH name2> <BRIDGE name> <ETH0 name> \"[COMMAND to be execute in the new space]\"
  To create a network namespace."

if [ $# -lt 5 ]; then
    echo $USAGE
    exit 1
fi

ns="$1"
vethA="$2"
vethB="$3"
br="$4"
eth="$5"

if [ $UID -ne 0 ]; then
    sudo $0 "$@"
    exit 0
fi

ip netns add ${ns}
ip link add ${vethA} type veth peer name ${vethB}
ip link set ${vethB} netns ${ns}
brctl addbr ${br}
brctl addif ${br} ${eth} ${vethA}
ifconfig ${eth} 0.0.0.0 promisc
ifconfig ${vethA} 0.0.0.0 promisc
dhclient ${br}
ip netns exec ${ns} dhclient ${vethB}
if [ "$6" = "" ]; then
    echo "Now in the newly created network namespace."
    ip netns exec ${ns} bash
else
    ip netns exec ${ns} sh -c "$6 &"
fi
