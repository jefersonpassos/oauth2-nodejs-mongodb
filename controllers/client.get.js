var DBclient = require('../models/client');

module.exports = function (req, res) {
	DBclient.find( function(err, clients){
		if(err)
			res.send(err);

		res.json(clients);
	});
};