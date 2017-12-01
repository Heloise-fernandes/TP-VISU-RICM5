# -*- coding: utf-8 -*-
"""
Created on Fri Nov 24 14:35:09 2017

@author: douria
"""

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'
     '<Document>'
     '<name> Exercice4 </name>'
     
)

with open("cities.txt","r") as fichier:
    cities=fichier.read()
    
listC = cities.split("\n")

for i in range(len(listC)-1):
    listl=listC[i].split(" ")
    kml+=('<Placemark>'
          '<name>'+listl[0]+ str(listl[3])+'</name>'
          '<TimeSpan>'
          '<begin>'+str( 2000+i)+'</begin>'
          '</TimeSpan>'
          '<Point>'
          '<coordinates>'+str(listl[1])+','+str(listl[2])+'</coordinates>'
          '</Point>'
          '<description></description>'
          '</Placemark>'
    )

kml+=('</Document></kml>')
print(kml)
