const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const config = require('../config')

async function getEmailConfig(name, tag) {
	const file = path.join(__dirname, '..', 'dockerfiles', name, tag, 'email.js')

	try {
		fs.accessSync(file, fs.constants.R_OK)
		return require(file) // eslint-disable-line global-require, import/no-dynamic-require
	} catch (err) {
		// NOTHING TODO
	}

	return null
}

async function send(name, tag) {
	const transporter = nodemailer.createTransport(config.email.transport)

	const specifyConfig = await getEmailConfig(name, tag)

	await transporter.sendMail(Object.assign({
		from: config.email.transport.auth.user,
		to: config.email.subscribers.join(','),
		subject: '测试网部署成功', // Subject line
		text: `${name}:${tag}`,
		html: `<b>${name}:${tag}</b>`, // html body
	}, specifyConfig))
}

module.exports = {
	send,
}
