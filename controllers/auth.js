var bearerStrategy = require('passport-http-bearer').Strategy;
var token = require('../models/token.model');
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;
var DBuser = require('../models/user.model');
var DBclient = require('../models/client');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new basicStrategy(
  function(username, password, callback) {
    DBuser.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      if (!user) { return callback(null, false); }


      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        if (!isMatch) { return callback(null, false); }

        return callback(null, user);
      });
    });
  }
 ));




passport.use('client-auth', new LocalStrategy(
  function(client, secret, callback) {
    DBclient.findOne({ id: client }, function (err, client) {
      if (err) { return callback(err); }

      if (!client || client.secret !== secret) { return callback(null, false); }

      return callback(null, client);
    });
  }
));




passport.use(new bearerStrategy(
	function(acessToken, callback) {
		token.findOne({ value :  acessToken }, function(err, token){
			if(err)
				return callback(err);

			if(!token) 
				return callback(null, false);
			
			DBuser.findOne({ _id : token.userId }, function(err, user){
				if(err)
					return callback(err);

				if(!user)
					return callback(null, false);

				callback(null, user, { scope: '*' });
			});
		});
	}
));



exports.isBearerAuthenticated = passport.authenticate('bearer', { session : false });

exports.isClientAuthenticated = passport.authenticate('client-auth', { session : false });

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
