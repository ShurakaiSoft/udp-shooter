/**
 * config file for what to do with the server..
 *
 *
 *
 */

var config = {
	server: {
		port: 5555,
		address: '127.0.0.1',
		remote: {
			port: 5554,
			address: '127.0.0.1'
		}
	},
	messages: {
		"hello": {
			name: "an 800 message type",
			message: "Hello World",
			response: "Hello back at ya"
		}
	}
}

module.exports = config;