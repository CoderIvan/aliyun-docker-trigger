const runScript = require('../lib/run_script')

describe('Exec', function root() {
	this.timeout(60 * 1000)

	it.skip('pullServiceImages', async () => {
		await runScript.pullServiceImages('mercku-router-admin', 'test')
	})

	it.skip('createAndStartContainers', async () => {
		await runScript.createAndStartContainers('mercku-router-admin', 'test')
	})
})
