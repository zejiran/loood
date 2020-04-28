from urllib.request import urlopen
page = r"C:\Users\Juan PC\Desktop\Lood\visionex\apikey.json" #Ruta de la llave de atuenticación
def explicit():
    from google.cloud import storage
    # Explicitly use service account credentials by specifying the private key
    # file.
    storage_client = storage.Client.from_service_account_json(page)

    # Make an authenticated API request
    buckets = list(storage_client.list_buckets())
    print(buckets)
