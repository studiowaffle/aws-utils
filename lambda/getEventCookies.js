function getCookiesFromHeader(headers) {
	if (headers === null || headers === undefined || headers.Cookie === undefined) {
		return {}
	}
	// Split a cookie string in an array (Originally found http://stackoverflow.com/a/3409200/1427439)
	const list = {}
	const rc = headers.Cookie || ''
	const cookies = rc.split(';')
	cookies.forEach(cookie => {
		const parts = cookie.split('=')
		const key = parts.shift().trim()
		const value = decodeURI(parts.join('='))
		if (key !== '') {
			list[key] = value
		}
	})
	return list
}
// ----------------------------------------------------------
function cookieObjectFromArray(cookies) {
	// Format received cookies into an object
	const cookieObj = {}
	cookies.forEach(cookie => {
		const [key, value] = cookie.split('=')
		cookieObj[key] = value
	})
	return cookieObj
}
// ----------------------------------------------------------
function getEventCookies(event) {
	if (event.cookies) {
		// HTTP API event
		return cookieObjectFromArray(event.cookies || [])
	}
	// REST API event
	return getCookiesFromHeader(event.headers)
}

module.exports = getEventCookies
