const AWS = require("aws-sdk");

async function getJsonFromS3(bucketName, prefix) {
  try {
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName,
      Key: prefix,
    };
    const data = await s3.getObject(params).promise();
    const json = JSON.parse(data.Body.toString());
    return json;
  } catch (err) {
    console.log("getJsonFromS3 - Error:", err.message);
    return null;
  }
}

module.exports = getJsonFromS3;
