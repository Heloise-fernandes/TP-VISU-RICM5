# -*- coding: utf-8 -*-
"""
Éditeur de Spyder

Ceci est un script temporaire.
"""

import random

latitudeO = 5.746944444444445 # 45.2025
latitudeE = 5.7863888888888885 # 5.779444444444445  45.1847222
longitudeN= 45.2030556   # 5.743333333333333
longitudeS = 45.1827778 # 5.7813888888888885
color= 'a0ffffff'

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'    
)
kml+=('<GroundOverlay>'
      '<name>Exercice2</name>'
      '<Icon>'
      '<href>PlanCampus.jpg</href>'
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
