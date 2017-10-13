import numpy as math
import numpy as np

#0.1

abscisse = np.linspace(-1.0, 1.0, num=2048)

mon_fichier = open("fichierSinus.txt", "w")

for x in abscisse:
    mon_fichier.write(str(math.sin(x*math.pi)))
    mon_fichier.write("\n")
mon_fichier.close()