const runScript = require('./run_script')
const json = require('../package.json')

module.exports = (router) => {
	router.get('/', async (ctx) => {
		ctx.response.body = `Hello World @ ${json.version}`
		ctx.response.status = 200
	})

	router.post('/', async (ctx) => {
		const { push_data: { tag }, repository: { name } } = ctx.request.body

		await runScript.pullServiceImages(name, tag)
		await runScript.createAndStartContainers(name, tag)

		ctx.response.status = 200
	})
}
