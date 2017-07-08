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
	socket.on('login', (username, cb) => {
		socket.username = username;
		Account.find({username}, (err, acc) => acc ? updateAccounts() : this.emit('cant find user'));
		cb(true);
	});
	socket.on('create account', (username) => {
		var account = new Account({username});
		account.save(updateAccounts);
	});
	socket.on('create post', (title, body) => {
		Account.findOne({username: socket.username}, (err, acc) => {
			acc && acc.posts.push({title, body}) && acc.save(updateAccounts)
		})
	})
	socket.on('get accounts', updateAccounts);
});



function updateAccounts() {
	Account.find({}, (err, accs) => io.emit('update accounts', accs));
}

