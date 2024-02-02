const AWS = require('aws-sdk')

const s3 = new AWS.S3()

async function uploadTextToS3(bucketName, prefix, text) {
	try {
		const params = {
			Bucket: bucketName,
			Key: prefix,
			Body: text,
		}
		await s3.putObject(params).promise()
		return true
	} catch (err) {
		console.log('uploadTextToS3 - Error:', err.message)
		return false
	}
}

module.exports = uploadTextToS3
