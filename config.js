module.exports = {
	port: 8000,
	dockerfilesdir: './dockerfiles',
	email: {
		transport: {
			host: 'smtp.qq.com',
			port: 465,
			secure: true,
			auth: {
				user: '1169227925@qq.com',
				pass: 'cidgdpqwvvbhbadg',
			},
		},
		subscribers: [
			'1169227925@qq.com',
		],
	},
}
