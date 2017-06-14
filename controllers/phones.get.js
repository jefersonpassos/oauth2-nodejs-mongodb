var DBPhones = require('../models/phones.model.js');

//query all numbers in database
module.exports = function(req, res){
	DBPhones.find({ userId : req.user._id },function(err, phones){
		if(err)
			res.send(err);

		res.json(phones);
	});
};