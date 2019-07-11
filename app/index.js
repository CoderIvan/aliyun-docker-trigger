const http = require('http')

const DEPLOY_TIME = new Date()

http.createServer((req, res) => {
	res.end(`
    [Service]
    [Deploy] @ ${DEPLOY_TIME}
    [Request] @ ${new Date()}
  `)
}).listen(80, () => {
	console.log('Server listening...') // eslint-disable-line no-console
})
