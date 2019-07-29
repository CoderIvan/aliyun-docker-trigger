const Server = require('./lib/app')
const getDockerConfig = require('./lib/get_docker_config')
const runScript = require('./lib/run_script')

const config = require('./config')

const server = new Server()

server.listen(config.port).then(() => {
	console.log(`Server Listen @ ${config.port}`)
})

getDockerConfig()
	.then(files => Promise.all(files.map(async ({ name, tag }) => {
		console.log(`create container ${name}/${tag}`)
		try {
			await runScript.createOrUpdateContainers(name, tag)
			console.log(`create container ${name}/${tag} finish`)
		} catch (error) {
			console.error(`create container ${name}/${tag} error`)
			console.error(error)
		}
	})))
