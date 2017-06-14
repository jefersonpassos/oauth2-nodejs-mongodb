var mongoose = require('mongoose');

var codeSchema = new mongoose.Schema({
	value : {
		type : String,
		require : true
	},
	redirectUri : {
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


module.exports = mongoose.model('code', codeSchema);