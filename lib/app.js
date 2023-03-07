const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body')
const util = require('util')

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
					request.ip,
					request.protocol,
					request.method,
					request.url,
					'<<',
					request.type,
					tldr(request.body),
				)
				await next()
				logger.log(
					request.ip,
					request.protocol,
					request.method,
					request.url,
					'>>',
					response.type,
					response.status,
					tldr(response.body),
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
