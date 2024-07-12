// This function will return all query string parameters from an event object.
// For any values that were supplied multiple times, or as a comma-separated string, they will be included as an array.
// For any parameters that were supplied, but with no value, they will be included as an empty string.

function getEventQueryStringParameters(event) {
	// The difference between the query parameters in an HTTP API and a REST API are how they handle query string parameters that have multiple values sent through.
	// REST API: query string parameters with multiple values are sent as an array
	// HTTP API: query string parameters with multiple values are sent as a comma separated string
	// See: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
	// (version 1.0 is what is used by traditional REST APIs)
	let parameters = {}
	if (event.version === '2.0') {
		// HTTP API event
		parameters = event.queryStringParameters || {}
		// Split any comma separated values into an array
		Object.keys(parameters).forEach(key => {
			parameters[key] = parameters[key] || ''
			parameters[key] = parameters[key].indexOf(',') ? parameters[key].split(',') : parameters[key]
		})
	} else {
		// REST API event
		parameters = event.multiValueQueryStringParameters || {}
	}

	// If we've ended up with any parameters that are an array with a single value, or an empty array, convert it to a string
	Object.keys(parameters).forEach(key => {
		parameters[key] = parameters[key] || []
		if (parameters[key].length === 0) parameters[key] = ''
		else if (parameters[key].length === 1) parameters[key] = parameters[key][0]
	})

	return parameters
}

module.exports = getEventQueryStringParameters
