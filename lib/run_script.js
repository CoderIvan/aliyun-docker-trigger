const fs = require('fs')
const { spawn } = require('child_process')
const path = require('path')

function pullServiceImages(name, tag) {
	const command = spawn('docker', ['pull', `registry.cn-qingdao.aliyuncs.com/dbjtech/${name}:${tag}`])

	command.stdout.on('data', (data) => {
		console._stdout.write(data)
	})

	command.stderr.on('data', (data) => {
		console._stderr.write(data)
	})

	return new Promise((resolve, reject) => {
		command.once('close', (code) => {
			if (code === 0) {
				resolve(code)
			} else {
				reject(code)
				console.log(`child process exited with code ${code}`)
			}
		})
	})
}

function createAndStartContainers(name, tag) {
	const file = path.join(__dirname, '..', 'dockerfiles', name, tag, 'docker-compose.yml')

	fs.accessSync(file, fs.constants.R_OK)
	const command = spawn('docker', ['stack', 'deploy', '-c', file, name, '--with-registry-auth'])

	command.stdout.on('data', (data) => {
		console._stdout.write(data) // eslint-disable-line no-underscore-dangle, no-console
	})

	command.stderr.on('data', (data) => {
		console._stderr.write(data) // eslint-disable-line no-underscore-dangle, no-console
	})

	return new Promise((resolve, reject) => {
		command.once('close', (code) => {
			if (code === 0) {
				resolve(code)
			} else {
				reject(code)
				console.log(`child process exited with code ${code}`) // eslint-disable-line no-console
			}
		})
	})
}

async function createOrUpdateContainers(name, tag) {
	await pullServiceImages(name, tag)
	await createAndStartContainers(name, tag)
}

module.exports = {
	// pullServiceImages,
	// createAndStartContainers,
	createOrUpdateContainers,
}
