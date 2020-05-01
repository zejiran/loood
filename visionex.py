

def startLoood(bucketuri):
    import os
    from google.cloud import vision
    from google.oauth2 import service_account


    creds = service_account.Credentials.from_service_account_file('key.json') #Aquí va la ruta a la llave de autenticación de la api
    client = vision.ImageAnnotatorClient(credentials=creds)
    image_uri = bucketuri
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = image_uri

    response = client.label_detection(image=image)

    print('Labels (and confidence score):')
    print('=' * 79)
    for label in response.label_annotations:
        print(f'{label.description} ({label.score*100.:.2f}%)')
