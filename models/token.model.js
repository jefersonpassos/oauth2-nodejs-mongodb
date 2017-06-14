var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
	value : {
		type : String,
		require : true
	},
	userId : {
		type : String,
		require : true
	},
	clientId : {
		type : String,
		require : true
	}
});

module.exports = mongoose.model('token', tokenSchema);