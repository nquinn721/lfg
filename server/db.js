var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://destinylfg:destinylfg@ds151662.mlab.com:51662/heroku_f9s75wxx')

var Post = new Schema({
	title: String,
	body: String
})

global.Account = mongoose.model('Account', {
	username: String,
	posts: [Post]
});
