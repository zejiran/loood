import os
from google.cloud import vision
import credentials as cred

cred.explicit()

image_uri = 'gs://loodvisionapi/índice.jpg'
client = vision.ImageAnnotatorClient()
image = vision.types.Image()
image.source.image_uri = image_uri

response = client.label_detection(image=image)

print('Labels (and confidence score):')
print('=' * 79)
for label in response.label_annotations:
    print(f'{label.description} ({label.score*100.:.2f}%)')