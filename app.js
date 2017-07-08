var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	db = require('./server/db');

server.listen(3000, () => console.log('Running server on port 3000'));

app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
	console.log(socket.id);
});