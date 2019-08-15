const http = require('http')

const DEPLOY_TIME = new Date()

const json = require('./package.json') // eslint-disable-line import/no-unresolved

http.createServer((req, res) => {
	res.end(`
    [Service]
    [Deploy] @ ${DEPLOY_TIME}
    [Request] @ ${new Date()}
    [Version] @ ${json.version},
  `)
}).listen(80, () => {
	console.log('Server listening...') // eslint-disable-line no-console
})
