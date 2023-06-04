// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

exports.labelDetection = async (req, res) => {
  const bucketName = 'exadas';
  const fileName = req.query.filename;

  // Performs label detection on the gcs file
  const [result] = await client.labelDetection(`gs://${bucketName}/${fileName}`);
  const labels = result.labelAnnotations;

  let firstNonFurnitureLabel = null;
  for (const label of labels) {
    if (label.description.toLowerCase() !== 'furniture') {
      firstNonFurnitureLabel = label.description;
      break;
    }
  }

  res.status(200).send(firstNonFurnitureLabel);
};
