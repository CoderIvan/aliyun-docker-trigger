const runScript = require('./run_script')
const email = require('./email')

const json = require('../package.json')

const DEPLOY_TIME = new Date()

module.exports = (router) => {
	router.get('/', async (ctx) => {
		ctx.body = [
			'[Service]',
			`[Deploy] @ ${DEPLOY_TIME}`,
			`[Request] @ ${new Date()}`,
			`[Version] @ ${json.version}`,
		].join('\n')
		ctx.response.status = 200
	})

	router.post('/', async (ctx) => {
		const { push_data: { tag }, repository: { name } } = ctx.request.body

		await runScript.createOrUpdateContainers(name, tag)
		await email.send(name, tag)

		ctx.response.status = 200
	})
}