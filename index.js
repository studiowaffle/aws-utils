module.exports = {
	getObjectListFromS3: require('./s3/getObjectListFromS3'),
	deleteObjectFromS3: require('./s3/deleteObjectFromS3'),
	uploadTextToS3: require('./s3/uploadTextToS3'),
	uploadFileToS3: require('./s3/uploadFileToS3'),
	getJsonFromS3: require('./s3/getJsonFromS3'),
	getTextFromS3: require('./s3/getTextFromS3'),

	getEventCookies: require('./lambda/getEventCookies'),
	getEventSource: require('./lambda/getEventSource'),
	httpResponses: require('./lambda/httpResponses'),
	getEventBody: require('./lambda/getEventBody'),
}
