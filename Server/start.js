const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const socket = require('./Sockets/socket');
const http = require('http').createServer(app);

const Start = () => {
	socket(http);
	middleware();
	routes();
	const PORT = process.env.PORT || 3000;
	http.listen(PORT, () => console.log('Listening on port ' + PORT));
};

const middleware = () => {
	app.use(express.static(path.join(__dirname, '..', 'Public')));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.set('view engine', 'ejs');
	app.set('views', 'Public/views');
};

const routes = () => {
	fs.readdirSync('./Server/Routes').filter(file => file.endsWith('.js')).forEach(file => {
		const route = require('./Routes/' + file);
		app.use(route);
	});
};

module.exports = Start;