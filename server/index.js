const express = require('express');

var multer = require("multer");
// source: https://github.com/expressjs/multer/issues/290#issuecomment-168720244
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
); 

// allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", async (req, resp) => {
  resp.send('PAPUH!');
});

/*
* this url accepts file-upload attribute (file) or file-url attribute (string)
* returns caption from google
*/
app.post('/image-upload', upload.single('file-upload'), async (req, resp) => {

  console.log('Req.file: ', req.file.buffer);
  let fileBuffer;

  if (req.file && req.file.buffer)
    fileBuffer = req.file.buffer;
  const fileUrl = req.body['file-url'];

  let labels;

  if (!!fileBuffer) {
    // file is present
    labels = await getLabels({
      content: fileBuffer
    });
  } else if (!!fileUrl) {
    // download the image from url and label it
    labels = await getLabels({
      content: fileUrl,
    })
  } else {
    // send back error
    resp.json({error: 'No fields provided'});
  }


  // resp.send(labels)
  resp.json(labels);

});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});


async function getLabels(image) {

  const imageContent = image.content;
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection(imageContent);
  const labels = result.labelAnnotations;
  console.log("Labels:");
  labels.forEach(label => console.log(label.description));
  return labels;
}