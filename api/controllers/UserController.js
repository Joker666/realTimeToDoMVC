/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'me': function(req, res){
		User.findById(req.userID, function(err, user){
			res.send(user);
		});
	},


	subscribe: function(req, res){
	  User.find({}).exec(function foundUsers(err, users){
	    if(err) return next(err);
	    User.watch(req.socket);
	    User.subscribe(req.socket, users);
	    res.send(200);
	  });
	}
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