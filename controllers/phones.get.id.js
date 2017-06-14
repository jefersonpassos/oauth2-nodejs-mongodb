var DBPhones = require('../models/phones.model.js');

module.exports = function(req, res){
	DBPhones.find({ userId : req.user._id, _id:req.params.phoneId }, function(err, phone){
		if(err)
			res.send(err);

		res.json(phone);
	});
};

