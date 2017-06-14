var DBclient = require('../models/client');

module.exports = function (req, res) {
	
	var client = new DBclient();

	client.name = req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;

	client.save( function(err){ 
		if (err)
			res.send(err);

		res.json({ message : 'client added to the locker', data : client});
	})
};