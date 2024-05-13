const AWS = require('aws-sdk')
const s3 = new AWS.S3()

async function objectExists(bucket, key) {
	try {
		await s3.headObject({ Bucket: bucket, Key: key }).promise()
		return true
	} catch (error) {
		if (error.code === 'NotFound') {
			return false
		}
		throw error
	}
}

module.exports = objectExists
