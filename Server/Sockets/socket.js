let io;
const fs = require('fs');
const Socket = (http) => {

	io = require('socket.io')(http, {
		cors: { origin: '*' }
	});
	
	fs.readdirSync('./Server/Sockets/Events').filter(file => file.endsWith('.js')).forEach(file => {
		const event = require('./Events/' + file);
		function fn(socket, _io = io) {
			event.callback(socket, _io);
		}
		io.on(event.name, fn);
	});
};
module.exports = Socket;