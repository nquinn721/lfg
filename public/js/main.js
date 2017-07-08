app.controller('main', function(socket, $scope) {
	this.name = 'Thanks for checking out looking for group';
	this.username;
	this.postTitle;
	this.postContent;

	this.createAccount = function() {
		socket.emit('create account', this.accountName);
	}
	this.login = function() {
		socket.emit('login', this.username, (loggedIn) => loggedIn ? this.loggedIn = true : this.loggedIn = false);
	}
	this.createPost = function() {
		socket.emit('create post', this.postTitle, this.postContent);
	}

	socket.on('update accounts', (accs) => this.accounts = accs);

	socket.emit('get accounts');
});

