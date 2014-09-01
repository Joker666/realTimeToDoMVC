/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'me': function(req, res){
		User.findById(req.userID, function foundUser(err, user){
			res.send(user);
		});
	},
	// Doing a DELETE /user/:parentid/message/:id will not delete the message itself
	  // We do that here.
	// 'remove': function(req, res) {
	//     // var relation = req.options.alias;
	//     // switch (relation) {
	//     //   case 'messages':
	//     //     destroyMessage(req, res);
	//     // }
	//     console.log(req.options);
 //  	}
};