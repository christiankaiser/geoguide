#!/usr/bin/env bash
FILES=$(find . -type f -name *.png)
for f in $FILES
do
    basename=${f%.png}
    convert $f -quality 80 $basename.jpg
    #rm $f
done