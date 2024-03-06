/**
 * Base response HTTP headers
 */
const responseHeaders = (mimeType, event) => ({
	'Content-Type': mimeType,
	'Access-Control-Allow-Origin': '*', // Required for CORS support to work
	'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
})

/**
 * HTTP response templates
 */
const responses = {
	binarySuccess: (data = {}, mimeType = 'application/json', code = 200) => ({
		statusCode: code,
		headers: responseHeaders(mimeType),
		body: data,
		isBase64Encoded: true,
	}),
	success: (data = {}, mimeType = 'application/json', code = 200) => ({
		statusCode: code,
		headers: responseHeaders(mimeType),
		body: mimeType === 'application/json' ? JSON.stringify(data) : data,
	}),
	error: error => {
		console.log('Error for response: ', JSON.stringify(error))
		let _err = error
		if (error instanceof Error) {
			// Convert to simple object
			_err = { code: error.code, message: error.message }
		}
		if (error instanceof String) {
			_err = { message: error }
		}
		return {
			statusCode: typeof error.code === 'number' ? error.code : 500,
			headers: responseHeaders('application/json'),
			body: JSON.stringify(_err),
		}
	},
}

module.exports = responses
