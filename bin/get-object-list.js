#!/usr/bin/env node

const bucket = process.argv[2]
const prefix = process.argv[3]

const getObjectListFromS3 = require('../getObjectListFromS3')

;(async () => {
	const objects = await getObjectListFromS3(bucket, prefix)
	console.log(objects)
})()
