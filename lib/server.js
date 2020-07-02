const Server = require('./app')
const getDockerConfig = require('./get_docker_config')
const runScript = require('./run_script')
const logger = require('./logger')
const config = require('../config')

const server = new Server()

async function run() {
	try {
		await server.listen(config.port)
		logger.log(`Server Listen @ ${config.port}`)

		const files = await getDockerConfig()

		await Promise.all(files.map(async ({ name, tag }) => {
			logger.log(`create container ${name}/${tag}`)
			try {
				await runScript.createOrUpdateContainers(name, tag)
				logger.log(`create container ${name}/${tag} finish`)
			} catch (error) {
				logger.error(`create container ${name}/${tag} error`)
				throw error
			}
		}))
	} catch (error) {
		logger.error(error.stack)
		throw error
	}
}

module.exports = {
	run,
}
