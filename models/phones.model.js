var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


var phonesSchema = new mongoose.Schema({
	name: String,
	number: Number,
	userId : String
});



module.exports = mongoose.model('phones', phonesSchema);