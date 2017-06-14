var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;


var userSchema = new mongoose.Schema({
	username : {
		type : String,
		unique : true,
		require : true
	},
	password : {
		type : String,
		require : true
	}
});

userSchema.pre('save', function(callback){
	var user = this;

	if(!user.isModified('password')) return callback();

	bcrypt.genSalt(5, function(err, salt){
		if(err) return callback(err);
		
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return callback(err);

			user.password = hash;
			callback();
		})
	});
});


userSchema.methods.verifyPassword = function(password, cb){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err)
			return cb(err);
		
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('users', userSchema);