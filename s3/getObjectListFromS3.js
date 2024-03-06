const AWS = require('aws-sdk')

const s3 = new AWS.S3()

async function getObjectListFromS3(bucketName, prefix) {
	try {
		const params = {
			Bucket: bucketName,
			Prefix: prefix,
		}
		const data = await s3.listObjects(params).promise()
		const objects = data.Contents.map(obj => obj.Key)
		return objects
	} catch (err) {
		console.log('getObjectListFromS3 - Error:', err.message)
		return []
	}
}

module.exports = getObjectListFromS3
