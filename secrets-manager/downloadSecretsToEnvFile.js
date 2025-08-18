const AWS = require('aws-sdk')
const fs = require('fs')

// Configure AWS SDK
AWS.config.update({ region: 'eu-west-2' })

const secretsManager = new AWS.SecretsManager()

// Get secret value from AWS Secrets Manager
async function getSecretValue(secretId) {
	try {
		const data = await secretsManager.getSecretValue({ SecretId: secretId }).promise()
		if (data.SecretString) {
			return JSON.parse(data.SecretString)
		} else {
			console.error('Secret binary is not supported in this script.')
		}
	} catch (err) {
		console.error('Error retrieving secret:', err)
		throw err
	}
}

// Transform secrets object to .env file format
function transformSecretsToEnvFormat(secrets) {
	const objectEntryToEnvVar = ([key, value]) => {
		if (typeof value === 'string') {
			value = value.replace(/\n/g, '\\n')
		}
		return `${key}=${value}`
	}
	return Object.entries(secrets).map(objectEntryToEnvVar).join('\n')
}

// Get secrets from AWS and write them to .env file
async function downloadSecretsToEnvFile(secretId, envFile) {
	try {
		const secrets = await getSecretValue(secretId)
		const envContent = transformSecretsToEnvFormat(secrets)

		fs.writeFileSync(envFile, envContent)
		console.log(envFile + ' file has been created.')
	} catch (err) {
		console.error('Error writing ' + envFile + ' file:', err)
	}
}

// =================================================================================================

if (require.main === module) {
	// Get name of secret and name of env file from CLI args
	const secretId = process.argv[2]
	if (!secretId) {
		console.error('Please provide secret name as an argument.')
		process.exit(1)
	}
	const envFile = process.argv[3]
	if (!envFile) {
		console.error('Please provide env file name as an argument.')
		process.exit(1)
	}
	// All being well, download secrets to env file
	downloadSecretsToEnvFile(secretId, envFile)
}
