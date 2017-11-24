# -*- coding: utf-8 -*-
"""
Éditeur de Spyder

Ceci est un script temporaire.
"""

import random

latitudeO =-6.151180487455577
latitudeE = 10.79288010970161
longitudeN= 51.14582064171803
longitudeS = 42.22993231551517
color= 'a0ffffff'

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'    
)
kml+=('<GroundOverlay>'
      '<name>Exercice1</name>'
      '<Icon>'
      '<href>data_tp2/carte.jpg</href>'
      '</Icon>'
      '<LatLonBox>'
      '<north>'+str(longitudeN)+'</north>'
      '<south>'+str(longitudeS)+'</south>'
      '<east>'+str(latitudeE)+'</east>'
      '<west>'+str(latitudeO)+'</west>'
      '</LatLonBox>'
      '<color>'+color+'</color>'
      '</GroundOverlay>'
)



kml+=('</kml>')
print(kml)