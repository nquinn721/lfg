var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	destiny = require('./server/destiny'),
	db = require('./server/db');

server.listen(process.env.PORT || 3000, () => console.log('Running server on port 3000'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));


io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on('create account', (username) => {
		var account = new Account({username});
		account.save(updateUsers);
	});
	socket.on('get accounts', updateUsers);
});



function updateUsers() {
	Account.find({}, (err, accs) => io.emit('update accounts', accs));
}