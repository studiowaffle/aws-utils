const AWS = require("aws-sdk");

async function getObjectListFromS3(bucketName, prefix) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };
  const data = await s3.listObjects(params).promise();
  const objects = data.Contents.map((obj) => obj.Key);
  return objects;
}

module.exports = getObjectListFromS3;
