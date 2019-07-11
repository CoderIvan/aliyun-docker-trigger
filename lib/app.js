const http = require('http')
const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const logger = require('koa-logger')

const setRouter = require('./set_router')

class App {
	constructor() {
		this.app = new Koa()
		this.app.use(koaBody())
		this.app.use(logger())
	}

	async listen(port) {
		const router = new Router()
		setRouter(router)
		this.app.use(router.routes())
		this.app.use(router.allowedMethods())

		if (!this.server) {
			this.server = http.createServer(this.app.callback())
			this.server.listen(port)
		}
	}

	async close() {
		if (this.server) {
			this.server.close()
		}
	}
}

module.exports = App
