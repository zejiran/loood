import argparse
import io
import os
from google.cloud import vision
from google.cloud.vision import types


APP_ROOT = os.path.dirname(os.path.abspath(__file__))
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(APP_ROOT, 'key.json')


def annotate(path):
    """Returns web annotations given the path to an image."""
    client = vision.ImageAnnotatorClient()

    if path.startswith('http') or path.startswith('gs:'):
        image = types.Image()
        image.source.image_uri = path

    else:
        with io.open(path, 'rb') as image_file:
            content = image_file.read()

        image = types.Image(content=content)

    web_detection = client.web_detection(image=image).web_detection

    return web_detection

def report(annotations):
    """Prints detected features in the provided web annotations."""

    if annotations.web_entities:
        for entity in annotations.web_entities:
            print('Description: {}'.format(entity.description))
            print('Description: {}'.format(entity.description), file=open("output.txt", "a"))


