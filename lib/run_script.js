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

	return new Promise((resolve) => {
		command.once('close', (code) => {
			resolve(code)
		})
	})
}

function createAndStartContainers(name, tag) {
	const file = path.join(__dirname, `../dockerfiles/${name}/${tag}/docker-compose.yml`)

	fs.accessSync(file, fs.constants.R_OK)
	const command = spawn('docker-compose', ['-f', file, 'up', '-d'])

	command.stdout.on('data', (data) => {
		console._stdout.write(data)
	})

	command.stderr.on('data', (data) => {
		console._stderr.write(data)
	})

	return new Promise((resolve) => {
		command.once('close', (code) => {
			resolve(code)
		})
	})
}

module.exports = {
	pullServiceImages,
	createAndStartContainers,
}
