module.exports = function(req, res, next) {
  var userId = req.param('parentid');
  var currentUserId = req.userID;

  if (userId != currentUserId) {
    return res.json(400, {err: 'from ownAssociation: You are not allowed to do that'}); // Is 400 correct here?
  }

  next();
};