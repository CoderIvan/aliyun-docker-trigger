const Server = require('./lib/app')

const config = require('./config')

const server = new Server()

server.listen(config.port).then(() => {
	console.log(`Server Listen @ ${config.port}`)
})
