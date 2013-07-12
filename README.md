# GeoGuide: making your didactic geo-trails mobile

GeoGuide is a HTML5-based mobile application for creating didactic trails primarily around topics from Geosciences. It might also be suitable for similar purposes.

GeoGuide integrates an interactive map of the regions of the trail. All the map tiles might be integrated into the application, in order to avoid the need to download the map on the go which in some cases might result in expensive roaming cost if the user is abroad. The interactive map shows places where information is available, along with the possibility to integrate photos, videos and texts for each location. The current user's position is also shown on the map to ease way finding.

GeoGuide is a project of the Institute of geography and sustainability of the University of Lausanne (http://www.unil.ch/igd).


## Build info

Building the app requires a Unix-based system, ideally Mac OS X, which is required for building the iOS app. Except for the iOS part, everything should work on Linux as well.

GeoGuide is the app framework for the didactic trails. We have so far implemented one trail through the city of Lausanne. Two others are currently in development, one in Vallon de Nant, and another one in Val d'Hérens. All 3 trails are inside the same project, and there is an "activate" command in the bin folder that allows for switching between the trails. For activating the Lausanne trail, simply type.

    cd /path/to/geoguide/bin
    activate lsne

After running this command, the Lausanne trail application is located in src/active, which is suitable for access over the Web.

In order to compile one of the native apps, you need to run the "precompile" command in the bin directory. Run "precompile ios" or "precompile android" according to the platform that you want. You might want to have a look into the precompile program, it is just a simple Python script.

The "run-server" command runs a simple Python HTTP server for development purposes (it serves the src/active directory).




## License

Copyright (C) 2013 Christian Kaiser, Institute of geography and sustainability, University of Lausanne

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.


## Contact

Further information around the project are available from http://igd.unil.ch/geoguide.

The author can be contacted directly by e-mail at chri.kais@gmail.com.
