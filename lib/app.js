const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body')
const util = require('util')
const chalk = require('chalk')

const router = require('./router')
const logger = require('./logger')

class App {
	constructor() {
		this.app = new Koa()
		this.app.use(koaBody())
		this.app.use((() => {
			const MAX = 1024
			function tldr(json) {
				if (json !== undefined && json !== null) {
					const string = JSON.stringify(json)
					return string.length > MAX ? `${string.substring(0, MAX)}...` : string
				}
				if (json === undefined || json === null) {
					return ''
				}
				return json
			}
			return async ({ request, response }, next) => {
				logger.log(
					request.ip, request.protocol,
					chalk.black(chalk.bgBlue(request.method)),
					chalk.black(chalk.bgCyan(request.url)),
					chalk.gray('<<'),
					request.type,
					chalk.gray(tldr(request.body)),
				)
				await next()
				let statusColor
				if (response.status >= 200 && response.status < 300) {
					statusColor = 'bgGreen'
				} else if (response.status >= 300 && response.status < 400) {
					statusColor = 'bgYellow'
				} else if (response.status >= 400 && response.status < 500) {
					statusColor = 'bgYellow'
				} else if (response.status >= 500) {
					statusColor = 'bgRed'
				}
				logger.log(
					request.ip, request.protocol,
					chalk.black(chalk.bgBlue(request.method)),
					chalk.black(chalk.bgCyan(request.url)),
					chalk.gray('>>'),
					response.type, chalk.black(chalk[statusColor](response.status)),
					chalk.gray(tldr(response.body)),
				)
			}
		})())
	}

	async listen(port) {
		this.app.use(router.routes(), router.allowedMethods())

		if (!this.server) {
			this.server = http.createServer(this.app.callback())
			await util.promisify(this.server.listen.bind(this.server))(port)
		}
	}

	async close() {
		if (this.server) {
			await util.promisify(this.server.close.bind(this.server))()
		}
	}
}

module.exports = App
