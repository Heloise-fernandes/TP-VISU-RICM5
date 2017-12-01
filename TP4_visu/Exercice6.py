# -*- coding: utf-8 -*-
"""
Created on Fri Nov 24 14:35:09 2017

@author: douria
"""

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'
     '<Document>'
     '<name> Exercice6 </name>'
     
)

with open("cities.txt","r") as fichier:
    cities=fichier.read()
    
listC = cities.split("\n")

for i in range(len(listC)-1):
    listl=listC[i].split(" ")
    if(i>=len(listC)-2):
         listlSuivant=listC[0].split(" ")
    else  : listlSuivant=listC[i+1].split(" ")

    diffLatitude=float(listlSuivant[1])-float(listl[1])
    diffLongetude=float(listlSuivant[2])-float(listl[2])
    pasLatitude=diffLatitude/10.0
    pasLongetitude=diffLongetude/10.0
    
    kml+=('<Placemark>'
          '<name>'+listl[0]+ str(listl[3])+'</name>'
          '<TimeSpan>'
          '<begin>'+str( 2000+i)+'</begin>'
          '</TimeSpan>'
          '<Point>'
          '<coordinates>'+str(listl[1])+','+str(listl[2])+'</coordinates>'
          '</Point>'
          '</Placemark>\n<Placemark>'
          '<styleUrl>#yellowLineGreenPoly</styleUrl>'
          '<LineString>'
          '<extrude>1</extrude>'
          '<tessellate>1</tessellate>'
          '<altitudeMode>absolute</altitudeMode>'
          '<coordinates>')
    DepartLat=float(listl[1])
    DepartLong=float(listl[2])
    for j in range(10):
        kml+=( str(DepartLat+j*pasLatitude)+','+str(DepartLong+j*pasLongetitude)+',100000\n')
          
    kml+=('</coordinates>'
          '</LineString>'
          '</Placemark>'
    )

kml+=('</Document></kml>')
print(kml)