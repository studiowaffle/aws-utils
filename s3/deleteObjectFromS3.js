const AWS = require('aws-sdk')

const s3 = new AWS.S3()

async function deleteObjectFromS3(bucketName, path) {
	try {
		const params = {
			Bucket: bucketName,
			Key: path,
		}
		await s3.deleteObject(params).promise()
		return true
	} catch (err) {
		console.log('deleteObjectFromS3 - Error:', err.message)
		return null
	}
}

module.exports = deleteObjectFromS3
