const fs = require('fs')
const { spawn } = require('child_process')
const path = require('path')

const Logger = require('./logger')

function pullServiceImages(region, namespace, name, tag) {
	const command = spawn('docker', ['pull', `registry.${region}.aliyuncs.com/${namespace}/${name}:${tag}`])

	command.stdout.on('data', console._stdout.write.bind(console._stdout))// eslint-disable-line no-underscore-dangle, no-console
	command.stderr.on('data', console._stderr.write.bind(console._stderr))// eslint-disable-line no-underscore-dangle, no-console

	return new Promise((resolve, reject) => {
		command.once('close', (code) => {
			if (code === 0) {
				resolve(code)
				Logger.log('pull service image success')
			} else {
				reject(code)
				Logger.error(`child process exited with code ${code}`)
			}
		})
	})
}

function createAndStartContainers(name, tag) {
	const file = path.join(__dirname, '..', 'dockerfiles', name, tag, 'docker-compose.yml')

	fs.accessSync(file, fs.constants.R_OK)
	const command = spawn('docker', ['stack', 'deploy', '-c', file, name, '--with-registry-auth'])

	command.stdout.on('data', console._stdout.write.bind(console._stdout))// eslint-disable-line no-underscore-dangle, no-console
	command.stderr.on('data', console._stderr.write.bind(console._stderr))// eslint-disable-line no-underscore-dangle, no-console

	return new Promise((resolve, reject) => {
		command.once('close', (code) => {
			if (code === 0) {
				resolve(code)
				Logger.log('create and restart container success')
			} else {
				reject(code)
				Logger.error(`child process exited with code ${code}`)
			}
		})
	})
}

async function createOrUpdateContainers(region, namespace, name, tag) {
	await pullServiceImages(region, namespace, name, tag)
	await createAndStartContainers(name, tag)
}

module.exports = {
	// pullServiceImages,
	// createAndStartContainers,
	createOrUpdateContainers,
}
