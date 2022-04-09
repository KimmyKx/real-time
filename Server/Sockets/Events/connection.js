const Event = require('../../Structures/Event');
const sessions = require('../../Utils/session');
const event = new Event('connection', (socket, io) => {
	socket.on('pos', (data) => {
		const user = sessions.session.find(s => s.id == data.id);
		if(!user) return;
		user.x = data.x;
		user.y = data.y;
		io.emit('pos', user);
	});

	socket.on('disconnect', (data) => {
		console.log(data);
		sessions.session.splice(sessions.session.findIndex(s => s.id == data.id), 1);
	});
	
	io.emit('new', { id: sessions.id, x: 0, y: 0 });
});

module.exports = event;