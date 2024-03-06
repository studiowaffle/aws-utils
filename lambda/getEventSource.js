function getEventSource(event) {
	const metadata = event.requestContext.http || event.requestContext.identity
	const { userAgent, sourceIp } = metadata
	return { ip: sourceIp, userAgent }
}

module.exports = getEventSource
