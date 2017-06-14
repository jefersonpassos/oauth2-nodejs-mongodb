var DBuser = require('../models/user.model');

module.exports = function (req, res) {
	
	DBuser.find( function(err, users){
		if(err)
			res.send(err);

		res.json(users);
	})
}