const Server = require('./lib/app')
const getDockerConfig = require('./lib/get_docker_config')
const runScript = require('./lib/run_script')
const myConsole = require('./lib/console')

const config = require('./config')

const server = new Server()

server.listen(config.port).then(() => {
	myConsole.log(`Server Listen @ ${config.port}`)
})

getDockerConfig()
	.then((files) => Promise.all(files.map(async ({ name, tag }) => {
		myConsole.log(`create container ${name}/${tag}`)
		try {
			await runScript(myConsole).createOrUpdateContainers(name, tag)
			myConsole.log(`create container ${name}/${tag} finish`)
		} catch (error) {
			myConsole.error(`create container ${name}/${tag} error`)
			myConsole.error(error)
		}
	})))
