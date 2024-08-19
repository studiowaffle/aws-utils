process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1'

module.exports = {
	getObjectListFromS3: require('./s3/getObjectListFromS3'),
	deleteObjectFromS3: require('./s3/deleteObjectFromS3'),
	uploadTextToS3: require('./s3/uploadTextToS3'),
	uploadFileToS3: require('./s3/uploadFileToS3'),
	getJsonFromS3: require('./s3/getJsonFromS3'),
	getTextFromS3: require('./s3/getTextFromS3'),

	getEventBody: require('./lambda/getEventBody'),
	getEventSource: require('./lambda/getEventSource'),
	getEventCookies: require('./lambda/getEventCookies'),
	getEventQueryStringParameters: require('./lambda/getEventQueryStringParameters'),

	httpResponses: require('./lambda/httpResponses'),
}
