/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
 	subscribe: function(req, res){
 	  Todo.find({}).exec(function(err, todos){
 	    if(err) return next(err);
 	    Todo.watch(req.socket);
 	    Todo.subscribe(req.socket, todos);
 	    res.send(200);
 	  });
 	}
};

