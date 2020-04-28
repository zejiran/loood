from google.cloud import vision
from google.oauth2 import service_account
creds = service_account.Credentials.from_service_account_file('./key.json') #Aquí va la ruta a la llave de autenticación de la api
client = vision.ImageAnnotatorClient(
   credentials=creds,
)