var DBPhones = require('../models/phones.model.js');

//delete a number
module.exports = function(req, res){
		DBPhones.remove( { userId : req.user._id , _id :req.params.phoneId }, function( err, idRemove ){
			if(err)
				res.send(err);

			res.json({ message: 'Number removed the DataBase'})
		});
};