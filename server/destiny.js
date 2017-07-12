var request = require('request');


module.exports = function (io) {
	var baseUri = 'https://www.bungie.net/Platform/Destiny/';
	function Destiny(username, type) {
		if(type = 'psn')
			this.membershipType = 2;
		else if (type === 'xbox')
			this.membershipType = 1;
		else if (type === 'web')
			this.membershipType = 254;


		this.username = username;
		

		this.destinyData = {};
	}

	Destiny.prototype = {
		get: function(urlName, cb) {
			this.request(urlName, cb);
		},

		getURL: function(urlName) {
			var urls = {
				destinyMembershipId: `SearchDestinyPlayer/${this.membershipType}/${this.username}`,
				summary: `${this.membershipType}/Account/${this.destinyMembershipId}/Summary/`,
				advisors: `${this.membershipType}/Account/${this.destinyMembershipId}/Advisors/`,
				character: `Stats/ActivityHistory/${this.membershipType}/${this.destinyMembershipId}/${this.characterId}/`,
				characterAdvisors: `${this.membershipType}/Account/${this.destinyMembershipId}/Character/${this.characterId}/Advisors/V2/`,
				items: `${this.membershipType}/Account/${this.destinyMembershipId}/Items/`,
				allItems: `Explorer/Items`,
				getItem: `Manifest/1/${this.itemid}/`
			}
			return baseUri + urls[urlName];
		},
		getMembershipId: function(cb) {
			if(!this.destinyMembershipId){
				apiCall(this.getURL('destinyMembershipId'), (data) => {
					this.destinyMembershipId = data.Response[0].membershipId;
					cb && cb()
				});
			}else{
				cb && cb(this.destinyMembershipId);
			}
		},
		request: function(urlName, cb) {
			this.getMembershipId(() => {
				console.log(this.getURL(urlName));
				apiCall(this.getURL(urlName), (data) => {
					if(!data || data.ErrorStatus !== 'Success')return cb(data ? data.ErrorStatus : 'error');
					if(data && data.Response){
						this.destinyData[urlName] = data.Response.data
						cb && cb(data.Response.data);
					}  
				})
			});
		},
		getCharacter: function() {
			var id, summary;
			if(this.destinyData.summary && this.destinyData.summary.characters){
				summary = this.destinyData.summary;
				for(var i = 0; i < summary.characters.length; i++){
					this.characterId = summary.characters[i].characterBase.characterId;
					this.request('characterAdvisors', (data) => console.log(data));
				}
			}
		}
	}
	var maoesx = new Destiny('maoesx', 'psn');

	// { itemHash: 4143670657,
 //  itemId: '6917529058235317231',
 //  quantity: 1,
 //  damageType: 4,
 //  damageTypeHash: 3454344768,
 //  isGridComplete: true,
 //  transferStatus: 3,
 //  state: 0,
 //  characterIndex: 0,
 //  bucketHash: 3284755031 }
 	// maoesx.itemid = '6917529058235317231';
 	// maoesx.get('getItem', (data) => {
 	// 	console.log(data);
 	// })
	// maoesx.get('items', (data) => {
	// 	var item = data.items[0];
	// 	maoesx.itemid = item.itemId;
	// 	maeosx.get('getItem', (d) => console.log(d));
	// 	// for(var i = 0; i < data.itemHashes.length; i++){
	// 		// maoesx.rawRequest('Manifest/item/' + data.itemHashes[i], (data) => console.log(data));
	// 	// }
	// });

	return Destiny;
	// return (function(type, username){
	// 	var membershipType;
		
	// 	console.log(membershipType, username);

		// apiCall(baseUri + 'SearchDestinyPlayer/2/maoesx', (data) => {
		// 	var membershipId = data.Response[0].membershipId;
		// 	console.log(membershipId);

		// 	apiCall(baseUri + '2/Account/'+ membershipId +'/Summary/', 
		// 		(data) => {
		// 			// io.emit('player info', data.Response.data);
		// 			console.log(data.Response.data)
		// 		});
		// })

	// })//('psn', 'maoesx'));

	function apiCall(uri, cb) {
		request({
			headers: {
				'X-API-Key': 'fc5525b06a0e40fdbbf068a6229c9e0b'
			},
			uri: uri
		},
			(err, data) => {
				data = data.toJSON().body;
				console.log(data);
				try{
					data = JSON.parse(data);
					cb(data);
					return;
				}catch(e){
					// cb('error', e);
				}
			});
	}
	
}
