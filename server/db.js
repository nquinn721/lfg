var mongoose = require('mongoose');


// mongoose.connect('')

global.Account = mongoose.model('Account', {
	username: String
});
