import math as m  
import numpy as np
import random as rand
#0.1

abscisse = np.linspace(-1.0, 1.0, num=2048)

#sinus
mon_fichier = open("sources_files/fichierSinus.txt", "w")

for x in abscisse:
    mon_fichier.write(str(m.sin(x*m.pi)))
    mon_fichier.write("\n")
mon_fichier.close()


mon_fichier = open("sources_files/fichierExpo.txt", "w")

for x in abscisse:
    mon_fichier.write(str(m.exp(x)))
    mon_fichier.write("\n")
mon_fichier.close()


mon_fichier = open("sources_files/fichierSinh.txt", "w")

for x in abscisse:
    mon_fichier.write(str(m.sinh(x)))
    mon_fichier.write("\n")
mon_fichier.close()

mon_fichier = open("sources_files/fichierAlea.txt", "w")

for x in abscisse:
    mon_fichier.write(str(rand.randint(-200,200)))
    mon_fichier.write("\n")
mon_fichier.close()