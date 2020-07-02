const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const config = require('../config')
const logger = require('./logger')

async function getEmailConfig(name, tag) {
	const file = path.join(__dirname, '..', 'dockerfiles', name, tag, 'email.js')

	try {
		fs.accessSync(file, fs.constants.R_OK)
		// eslint-disable-next-line global-require, import/no-dynamic-require
		const specifyConfig = require(file)
		if (specifyConfig) {
			logger.log('[Get Email Config]', JSON.stringify(specifyConfig))
		}
		return specifyConfig
	} catch (err) {
		// NOTHING TODO
	}
	return null
}

async function send(name, tag) {
	const transporter = nodemailer.createTransport(config.email.transport)

	const specifyConfig = await getEmailConfig(name, tag)

	const finalConfig = {
		from: config.email.transport.auth.user,
		to: config.email.subscribers,
		subject: '测试网部署成功', // Subject line
		text: `${name}:${tag}`,
		html: `<b>${name}:${tag}</b>`, // html body
		...specifyConfig,
	}

	if (finalConfig.to && finalConfig.to.length > 0) {
		await transporter.sendMail(finalConfig)

		logger.log('[Send To]', ...finalConfig.to.split(','))
	}
}

module.exports = {
	send,
}
