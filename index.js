const Server = require('./lib/app')

const server = new Server()

const port = process.env.PORT || 80

server.listen(port).then(() => {
	console.log(`Server Listen @ ${port}`)
})
