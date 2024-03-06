function paramsToObject(params) {
	const entries = params.entries()
	const result = {}
	// eslint-disable-next-line no-restricted-syntax
	for (const [key, value] of entries) {
		result[key] = value
	}
	return result
}

module.exports = paramsToObject
