const nodemailer = require('nodemailer')

const config = require('../config')

async function send(name, tag) {
	const transporter = nodemailer.createTransport(config.email.transport)

	await transporter.sendMail({
		from: config.email.transport.auth.user,
		to: config.email.subscribers.join(','),
		subject: '测试网部署成功', // Subject line
		text: `${name}:${tag}`,
		html: `<b>${name}:${tag}</b>`, // html body
	})
}

module.exports = {
	send,
}
