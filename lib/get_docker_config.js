const glob = require('glob')
const util = require('util')

const globAsync = util.promisify(glob)

module.exports = () => globAsync('dockerfiles/**/*.yml', {})
	.then(files => files.map((file) => {
		const [, name, tag] = file.split('/')
		return 	({ name, tag })
	}))
