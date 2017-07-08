var mongoose = require('mongoose');


mongoose.connect('mongodb://destinylfg:destinylfg@ds151662.mlab.com:51662/heroku_f9s75wxx')

global.Account = mongoose.model('Account', {
	username: String
});
