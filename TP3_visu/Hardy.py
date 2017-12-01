import math as m  
import numpy as np
import random as rand
N = 100
A = 0.815
B = 0.0001

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
    if (len(pointConnus) == 0) : 
        return -1
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
    
    

test = [[0.30,0.5,2.45],[0.30,0.80,4.2],[0.50,0.30,10.2],[0.80,0.30,6.89]]

def calculR(pointsConnus):
    somme = 0
    for x in pointsConnus:
        for y in pointsConnus:
            somme = somme + distancePoints(x,y)
    moyenne = somme / (m.pow(len(pointsConnus),2)-len(pointsConnus))
    return B*moyenne

def calculHardyMatrice(pointsConnus,R):
    i = 0
    matrice = np.zeros(shape=(len(pointsConnus),len(pointsConnus)))
    for x in pointsConnus:
        j = 0        
        for k in pointsConnus:
            matrice[i][j] = poidsHardy(x,k,R)
            j = j+1
        i = i+1
    return matrice

def tabPoidsConnus(pointsConnus):
    i = 0
    poidsConnus = np.zeros(len(pointsConnus))
    
    for p in pointsConnus:
        print(str(p))
        poidsConnus[i] = p[2] 
        i = i+1
    return poidsConnus

#write("test_base_10", test)
def calculAlpha(pointsConnus, R):
    matrice = calculHardyMatrice(pointsConnus, R)
    poidsConnus = tabPoidsConnus(pointsConnus)
    alpha = np.linalg.solve(matrice, poidsConnus)
    return alpha



def distancePoints(p1, p2):
    return m.sqrt(m.pow(p1[0]-p2[0], 2) + m.pow(p1[1]-p2[1], 2))
     
def poidsHardy(monPoint, pointCourant, R):
    return m.sqrt( R + m.pow(distancePoints(monPoint, pointCourant),2))

def Hardy(monPoint, pointsConnus, R, alpha):
    resultat = 0
    i = 0
    for pointCourant in pointsConnus:
        resultat = resultat + poidsHardy(monPoint, pointCourant, R) * alpha[i]
        i = i+1
    return resultat
    
def ExecuteHardy(pointsConnus, N):
    resPoint = []
    R = calculR(pointsConnus)
    alpha = calculAlpha(pointsConnus, R)
    for x in np.linspace(0,1,N+1):
        for y in np.linspace(0,1,N+1):
            val = pointExiste([x,y], pointsConnus)
            if (val==-1):
                resPoint.append([x,y,Hardy([x,y],pointsConnus,R,alpha)])
            else:
                resPoint.append([x,y,val])
    return resPoint
cossin = []
cossin = generateRandomPointsConnus(5,N)
write("result_Hardy_test_base_100_0.0001", ExecuteHardy(cossin, N))
