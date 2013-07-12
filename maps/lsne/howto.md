# Maps for Lausanne app

The maps have been built using TileMill, based on the Mapbox OSM Bright template, as discussed here:
http://www.mapbox.com/tilemill/docs/guides/osm-bright-ubuntu-quickstart/

The modified map style files are located in the styles folder.

The map tiles can be exported into a MBTiles file, and the XYZ tiles extracted as PNG files using mb-util: https://github.com/mapbox/mbutil

There is only a reduced number of tiles included in the map in order to reduce storage requirements. List of included files is in tile-list.txt. Original PNG files have been converted to smaller JPG files using ImageMagick's "convert" utility. There is a shell script in "convert2minijpg.sh" looping over all PNG files in the current directory, converting them to JPG files and deleting the PNG files if line 7 is uncommented.
