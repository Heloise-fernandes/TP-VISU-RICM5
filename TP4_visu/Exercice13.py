# -*- coding: utf-8 -*-
"""
Created on Fri Nov 24 14:35:09 2017

@author: douria
"""

kml=('<?xml version="1.0" encoding="UTF-8"?>'
     '<kml xmlns="http://www.opengis.net/kml/2.2">'
     '<Document>'
     '<name> Exercice13 </name>'
     '<Style id=\'myLine\'>\n'
     '<LineStyle>\n'
     '<color>a10000ff</color>\n'
     '<width>4</width>\n'
     '</LineStyle>\n'
     '<PolyStyle>\n'
     '<color>a10000ff</color>\n'
     '</PolyStyle>\n'
     '</Style>\n'
)




with open("cities.txt","r") as fichier:
    cities=fichier.read()
    
listC = cities.split("\n")
numStep = 10

	

for i in range(len(listC)-1):
    listl=listC[i].split(" ")
    if(i>=len(listC)-2):
         listlSuivant=listC[0].split(" ")
    else  : listlSuivant=listC[i+1].split(" ")

    diffLatitude=float(listlSuivant[1])-float(listl[1])
    diffLongetude=float(listlSuivant[2])-float(listl[2])
    pasLatitude=diffLatitude/numStep
    pasLongetitude=diffLongetude/numStep
    
    kml+=('<Placemark>'
          '<name>'+listl[0]+ str(listl[3])+'</name>'
          '<TimeSpan>'
          '<begin>'+str( 2000+i)+'</begin>'
          '</TimeSpan>'
          '<Point>'
          '<coordinates>'+str(listl[1])+','+str(listl[2])+'</coordinates>'
          '</Point>'
          '</Placemark>\n')
    kml+=('<Placemark>'
          '<styleUrl>#myLine</styleUrl>'
          '<LineString>'
          '<extrude>1</extrude>'
          '<tessellate>1</tessellate>'
          '<altitudeMode>absolute</altitudeMode>'
          '<coordinates>')
          
    DepartLat=listl[1]
    DepartLong=listl[2]
    for j in range(numStep+1):
        kml+=( str(float(DepartLat)+j*pasLatitude)+','+str(float(DepartLong)+j*pasLongetitude)+',100000\n')
        
    kml+=('</coordinates>'
          '</LineString>'
          '</Placemark>\n'
    )
    
    
    
    color = int(float(listl[2])*16/8.8)
    kml+=('<Placemark>'
	'<Style>\n'
	'<LineStyle>\n'
	'<color>ff0000ff</color>\n'
	'<width>4</width>\n'
	'</LineStyle>\n'
	'<PolyStyle>\n'
	'<color>ff0000'+str(format(color, 'x'))+'</color>\n'
	'</PolyStyle>\n'
	'</Style>\n'
	'<Polygon>'
	'<extrude>1</extrude>'
	'<altitudeMode>relativeToGround</altitudeMode>'
	'<outerBoundaryIs>'
	'<LinearRing>'
	'<coordinates>'+
	str( float(listl[1])+float(listl[3])/5.0)+','+str(float(listl[2])+float(listl[3])/5.0)+',100000\n'+
	str(float(listl[1])+float(listl[3])/5.0)+','+str(float(listl[2])-float(listl[3])/5.0)+',100000\n'+
	str(float(listl[1])-float(listl[3])/5.0)+','+str(float(listl[2])-float(listl[3])/5.0)+',100000\n'+
	str(float(listl[1])-float(listl[3])/5.0)+','+str(float(listl[2])+float(listl[3])/5.0)+',100000\n'+
	'</coordinates>'
	'</LinearRing>'
	'</outerBoundaryIs>'
	'</Polygon >'
	'</Placemark >')

kml+=('</Document></kml>')
print(kml)



