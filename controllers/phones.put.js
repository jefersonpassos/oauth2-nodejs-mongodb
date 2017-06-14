var DBPhones = require('../models/phones.model.js');

module.exports = function(req, res){
	DBPhones.find( { userId : req.user_id , _id :req.params.phoneId } , function(err, phone){
		if(err)
			res.send(err);

		phone.name = req.body.name;
		phone.number = req.body.number;

		phone.save( function(err, phone){
			if(err)
				res.send(err);

			res.json(phone);
		});
	});
};