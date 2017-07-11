app.controller('main', function(socket, $scope) {
	var self = this;
	this.name = 'Thanks for checking out looking for group';
	this.username;
	this.postTitle;
	this.postContent;
	this.system = 'psn';

	this.createAccount = function() {
		socket.emit('create account', this.accountName);
	}
	this.login = function() {
		socket.emit('login', 'advisors', this.system, this.username, (loggedIn) => loggedIn ? this.loggedIn = true : this.loggedIn = false);
	}
	this.createPost = function() {
		socket.emit('create post', this.postTitle, this.postContent);
	}

	socket.on('update accounts', (accs) => this.accounts = accs);
	var base = 'https://www.bungie.net';
	socket.emit('get accounts');
	socket.on('advisors', (data) => console.log(data));
	socket.on('summary', (data) => {
		for(var i = 0; i < data.characters.length; i++){
			$('body').append($('<img>', {src: base + data.characters[i].emblemPath})).append($('<br>'));
			$('body').append($('<img>', {src: base + data.characters[i].backgroundPath})).append($('<br>'));
		}
	});
});

