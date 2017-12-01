import math as m  
import numpy as np
import random as rand


def read(nom):
    mon_fichier = open(nom, 'r')
    fichier = mon_fichier.read() 
    mon_fichier.close()
    return fichier
    
def write(nom, content):
    mon_fichier = open(nom+".txt", 'w')
    for x,y,v in content:
        mon_fichier.write(str(x)+" "+str(y)+" "+str(v)+"\n")
    mon_fichier.close()
    
    
def pointExiste(point,pointConnus):
    for p in pointConnus:
        if (p[0]==point[0] and p[1]==point[1]):
            return p[2]
    return -1
       
def generateRandomPointsConnus(nombrePoints,N):    
    pointsFinaux = []
    i = 0
    
    while (i<nombrePoints):
        pointCourant = [0.0,0.0,0.0]
        pointCourant[0] = round(rand.choice(np.linspace(0,1,num=N,endpoint=False)),int(m.log(N,10)))
        pointCourant[1] = round(rand.choice(np.linspace(0,1,num=N,endpoint=False)),int(m.log(N,10)))
        pointCourant[2] = np.cos(pointCourant[0]/2)+np.sin(pointCourant[1]/2)
        if (pointCourant not in pointsFinaux):
            pointsFinaux.append(pointCourant)
            i = i+1
    return pointsFinaux

N = 100.0
mu = 5
test = [[0.30,0.5,2.45],[0.30,0.80,4.2],[0.50,0.30,10.2],[0.80,0.30,6.89]]

#write("test_base_10", test)




def distancePoints(p1, p2):
    return m.sqrt(m.pow(p1[0]-p2[0], 2) + m.pow(p1[1]-p2[1], 2))
     
def determinantPoidsShepard(monPoint, pointsConnus, mu):
    valeur = 0    
    for point in pointsConnus:
        valeur = valeur + 1 / m.pow(distancePoints(monPoint, point),mu)
    return valeur

def poidsShepard(monPoint, monPointCourant, pointsConnus, mu):
    numerateur = 1 / m.pow(distancePoints(monPoint, monPointCourant),mu)
    denominateur = determinantPoidsShepard(monPoint, pointsConnus, mu)
    return numerateur/denominateur

def Shepard(monPoint, pointsConnus, mu):
    resultat = 0
    for pointCourant in pointsConnus:
        resultat = resultat + poidsShepard(monPoint, pointCourant, pointsConnus, mu) * pointCourant[2]
    return resultat
    
def ExecuteShepard(pointsConnus, mu, N):
    resPoint = [] 
    for x in np.linspace(0,1,N+1):
        for y in np.linspace(0,1,N+1):
            val = pointExiste([x,y], pointsConnus)
            if (val==-1):
                resPoint.append([x,y,Shepard([x,y],pointsConnus,mu)])
            else:
                resPoint.append([x,y,val])
    return resPoint

cossin = generateRandomPointsConnus(5,N)
write("result_Shepard_test_base_100", ExecuteShepard(cossin, mu, N))
