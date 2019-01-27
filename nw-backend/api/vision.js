const dotenv = require('dotenv');
dotenv.load({ path: '.env' });
const Storage = require('@google-cloud/storage');
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const storage = Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
// Makes an authenticated API request.
storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
});
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

exports.webDetection = (imageUri, callback) =>{
    listOfKeyWords = []
    client
    .webDetection(imageUri)
    .then(results => {
        const entities = results[0].webDetection.webEntities;
        entities.forEach(entity => listOfKeyWords.push(entity.description));
        callback(null, listOfKeyWords);
    })
    .catch(err => {
    console.error('ERROR:', err);
    });
};
