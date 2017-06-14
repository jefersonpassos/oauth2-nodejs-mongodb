var DBPhones = require('../models/phones.model.js');

module.exports = function(req, res){

	var phones = new DBPhones();

	phones.name = req.body.name;
	phones.number = req.body.number;
	phones.userId = req.user._id;

	phones.save( function(err){
		if(err)
			res.send(err);

		res.json({ message:'Number added in DataBase', data : phones});
	})

};
