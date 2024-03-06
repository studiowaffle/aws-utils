const jsonparse = require('try-json')
const paramsToObject = require('./paramsToObject')

function getEventBody(event) {
	if (!event || !event.body) return null
	let eventBody = event.body
	if (event.isBase64Encoded) {
		eventBody = Buffer.from(event.body, 'base64').toString()
	}
	let body = null
	if (event.headers['content-type'] === 'application/x-www-form-urlencoded') {
		// eventBody should be a URL encoded string
		// e.g. results=%5B%7B%22i%22%3A110%2C%22s%22%3A2%7D%5D&uuid=%22e7ef876e-21f7-49f4-893d-6db2349790dc%22
		const sp = new URLSearchParams(eventBody)
		body = paramsToObject(sp)
		Object.keys(body).forEach(key => {
			body[key] = jsonparse(body[key])
		})
	} else {
		body = jsonparse(eventBody)
	}

	return body
}

module.exports = getEventBody
