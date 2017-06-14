var DBuser = require('../models/user.model');

module.exports = function(req, res){
	var user = new DBuser({
		username: req.body.username,
		password : req.body.password
	});

	user.save( function(err){
		if(err)
			res.send(err);

		res.json({message: 'user registered'});
	});
}