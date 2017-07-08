// var request = require('request');
// var passport = require('passport');
// var OAuth2Strategy = require('passport-oauth2');

// // GET https://www.bungie.net/Platform/User/GetBungieNetUser/ HTTP/1.1
// // Host: www.bungie.net
// // Connection: keep-alive
// // Accept: application/json, text/javascript, */*; q=0.01
// // Origin: https://example.com
// // User-Agent: app-platform
// // Authorization: Bearer CHMS5gEAIGouCzYA...CWpeDmBF2SN9Khan7Q==
// // X-API-Key: 6747e6eaab87471cb98620895e554c69


// passport.use(new OAuth2Strategy({
//     authorizationURL: 'https://www.bungie.net/Platform/User/GetBungieNetUser',
//     tokenURL: 'https://www.example.com/oauth2/token',
//     clientID: 13954,
//     clientSecret: EXAMPLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/example/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
// request.get('https://www.bungie.net/Platform/Destiny/Explorer/Items', (err, data) => console.log(data.toJSON()));
