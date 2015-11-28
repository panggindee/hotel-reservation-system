#!/bin/sh

PORT=7001

if [ $1 ]; then
  echo $1
  PORT=$1
fi

echo starting http server at localhost port $PORT
python -m SimpleHTTPServer $PORT
