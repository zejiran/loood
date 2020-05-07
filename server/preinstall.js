// reads auth info for Google Cloud Vision API to a file so the @google-cloud/vision sdk could use it
const fs=require('fs'); 
fs.writeFile('./google-credentials-vision.json', process.env.GOOGLE_CONFIG, (err) => {});