var FacebookStrategy = require('passport-facebook').Strategy;

var UserMod = require('../models/user');
module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
	    done(null, user);
	});

	passport.use('facebook', new FacebookStrategy(
			{
				clientID : '364517680663204',
				clientSecret : 'da09656ab6f17ad446bf071f47be4356',
				callbackURL : 'http://localhost:3000/facebook/callback',
				profileFields : ['id', 'displayName', 'photos', 'email']
			}, function(access_token, refresh_token, profile, done){
				process.nextTick(function(){
					console.log('---------', profile);

					UserMod.insertOrUpdate({ 'facebook.id' : profile.id }, { facebook : profile._json}, function(err, result){
						if(err){
							return err;
						}
						console.log('Data Saved');
						done(null, profile);
					});
				});
			}
		)

	)
}