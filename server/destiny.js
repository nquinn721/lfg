var request = require('request');


module.exports = function (io) {
	var baseUri = 'https://www.bungie.net/Platform/Destiny/';


	return (function(type, username){
		var accountType;
		if(type = 'psn')
			accountType = 2;
		else if (type === 'xbox')
			accountType = 1;
		else if (type === 'web')
			accountType = 254;
		console.log(accountType, username);

		get(baseUri + 'SearchDestinyPlayer/'+ accountType +'/' + username, (data) => {
			var membershipId = data.Response[0].membershipId;
			console.log(membershipId);

			get(baseUri + '/'+ accountType +'/Account/'+ membershipId +'/Summary/', 
				(data) => {
					io.emit('player info', data.Response.data);
					console.log(data.Response.data)
				});
		})

	})//('psn', 'maoesx'));

	function get(uri, cb) {
		request({
			headers: {
				'X-API-Key': 'fc5525b06a0e40fdbbf068a6229c9e0b'
			},
			uri: uri
		},
			(err, data) => {
				data = JSON.parse(data.toJSON().body);
				cb(data);
			});
	}
	
}
