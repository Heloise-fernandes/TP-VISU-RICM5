# -*- coding: utf-8 -*-
"""
Created on Fri Nov 24 14:35:09 2017

@author: douria
"""

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'
     '<Document>'
     '<name> exercice3 </name>'
     
)

with open("cities.txt","r") as fichier:
    cities=fichier.read()
    
listC = cities.split("\n")

for i in range(len(listC)-1):
    listl=listC[i].split(" ")
    if(i>=len(listC)-2):
         listlSuivant=listC[0].split(" ")
    else   listlSuivant=listC[i+1].split(" ")

    diffLatitude=listlSuivant[1]-listl[1]
    diffLongetude=listlSuivant[2]-listl[2]
    pasLatitude=diffLatitude/10
    pasLongetitude=diffLongetude/10
    
    kml+=('<Placemark>'
          '<name>'+listl[0]+ str(listl[3])+'</name>'
          '<TimeSpan>'
          '<begin>'+str( 2000+i)+'</begin>'
          '</TimeSpan>'
          '<Point>'
          '<coordinates>'+str(listl[1])+','+str(listl[2])+'</coordinates>'
          '</Point>'
          '<LineString>'
          '<styleUrl>#yellowLineGreenPoly</styleUrl>'
          '<extrude>1</extrude>'
          '<tessellate>1</tessellate>'
          '<altitudeMode>absolute</altitudeMode>'
          '<coordinates>')
          for j in 0..10
          
          str(listl[1])+','+str(listl[2])+','+str(listlSuivant[1])+','+str(listlSuivant[2])+'</coordinates>'
          '</LineString>'
          '</Placemark>'
    )

kml+=('</Document></kml>')
print(kml)