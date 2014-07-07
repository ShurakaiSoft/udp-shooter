/**
 * A test udp message sender.
 *
 * Can also time how long it takes to send all messages
 *
 *
 *
 * Testing
 *
 * using netcat:
 *
 * 		echo -n "Hello World" | nc -4u -w1 127.0.0.1 5555
 *
 *
 * Author: Stephen Parker <shurakaisoft@gmail.com>
 */

// dependencies
var winston = require('winston'),
	dgram = require('dgram');


// configuration file
var config = require('./config');


// variables
var server,
	packets = 1000000,	// number of packets to send
	progress = 1000,	// number of packets per progress dot.
	port = 5555,
	address = '127.0.0.1',
	remoteAddress = '127.0.0.1',
	remotePort = 5554;


function createStartupMessage() {
	return "UDP shooter sending packets to: " +
			server.address().address +
			":" + server.address().port;
}


// create a server
server = dgram.createSocket('udp4');
winston.level = 'info';


// bind event handlers
server.on('listening', function () {
	var end, i,
		message = config.messages['hello'],
		start = process.hrtime(),
		buffer = new Buffer(message.message, 'utf8');

	winston.info(createStartupMessage());

	// action
	for (i = 0; i < packets; i++) {
		if ((i % progress) === 0) {
			process.stdout.write('.');
		}
		server.send(buffer, 0, buffer.length, remotePort, remoteAddress);
	}
	end = process.hrtime(start);
	winston.info("Time taken: %d:%d", end[0], Math.floor(end[1] / 1000000));
});


server.on('message', function (message, remote) {
	winston.info("received message of:", message.toString('utf8'), "from", remote.address + ":" + remote.port);
});


server.on('error', function (error) {
	if (error instanceof Error) {
		winston.error(error.stack);
	} else {
		winston.error(error);
	}
});


// start the server
server.bind(port, address);
