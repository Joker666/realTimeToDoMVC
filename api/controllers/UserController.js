/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'me': function(req, res){
		User.findById(req.userID, function foundUser(err, user){
			console.log(user);
			res.send(user);
		});
	}
};

