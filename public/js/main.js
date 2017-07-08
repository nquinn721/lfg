app.controller('main', function(socket, $scope) {
	this.name = 'Thanks for checking out looking for group';

	this.createAccount = function() {
		socket.emit('create account', this.accountName);
	}

	socket.on('update accounts', (accs) => this.accounts = accs);

	socket.emit('get accounts');
});

