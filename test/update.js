const runScript = require('../lib/run_script')

describe('Exec', function root() {
	this.timeout(60 * 1000)

	it('pullServiceImages', async () => {
		await runScript.pullServiceImages('aliyun-docker-trigger', 'example')
	})

	it('createAndStartContainers', async () => {
		await runScript.createAndStartContainers('aliyun-docker-trigger', 'example')
	})
})
