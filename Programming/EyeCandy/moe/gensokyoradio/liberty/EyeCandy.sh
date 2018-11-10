#!/bin/sh
DIR=$(cd "$(dirname "$0")/../../../"; pwd)
cd $DIR
java moe.gensokyoradio.liberty.EyeCandy 1200 20 &
