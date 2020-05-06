import os
import Vision


url ="https://upload.wikimedia.org/wikipedia/commons/3/31/Ice_Cream_dessert_02.jpg" #Url de la imagen a analizar

Vision.report(Vision.annotate(url))