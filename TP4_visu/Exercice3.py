# -*- coding: utf-8 -*-
"""
Created on Fri Nov 24 14:35:09 2017

@author: douria
"""

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'    
)

with open("cities.txt","r") as fichier:
    cities=fichier.read()
    
listC = cities.split("\n")

for i in range(len(listC)-1):
    listl=listC[i].split(" ")
    print(listl[0])
    print(listl[1])
    print(listl[2])
    print(listl[3])
    kml+=('<Placemark id="'+listl[0]+str(listl[3])+'">'
          '<name>'+listl[0]+'</name>'
          '<Point>'
          '<coordinates>'+str(listl[1])+','+str(listl[2])+'</coordinates>'
          '</Point>'
          '<description></description>'
          '</Placemark>'
    )


kml+=('</kml>')
print(kml)