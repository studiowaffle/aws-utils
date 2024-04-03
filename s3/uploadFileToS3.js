const AWS = require('aws-sdk')
const fs = require('fs')

// initialize S3 client
const s3 = new AWS.S3()

function uploadFileToS3(bucketName, path, filePath, { public = false, mimeType, cacheControl }) {
	console.log('uploadFileToS3', bucketName, path)

	// upload file to S3
	return new Promise((resolve, reject) => {
		const params = {
			Bucket: bucketName,
			Key: path,
			Body: fs.readFileSync(filePath),
		}

		if (public) params.ACL = 'public-read'
		if (mimeType) params.ContentType = mimeType
		if (cacheControl) params.CacheControl = cacheControl

		s3.putObject(params, err => {
			if (err) {
				console.error('Upload error: ', err.message)
				return reject(err)
			}
			console.log(`Uploaded ${bucketName}/${path}`)
			resolve()
		})
	})
}

module.exports = uploadFileToS3
