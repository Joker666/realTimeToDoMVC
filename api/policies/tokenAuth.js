// var jwtSimple = require('jwt-simple');

module.exports = function(req, res, next) {

    if (!req.headers.authorization) {
          return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }

    var token = req.headers.authorization.split(' ')[1];

    // var userID = jwtSimple.decode(token, "oursecret");
    // console.log(userID);
    // req.userID = userID;

    TokenService.verifyToken(token, function(err, decoded) {
        if (err) return res.json(401, { err: 'The token is not valid' });
        console.log('verifying ...........');
        console.log(decoded);
        req.userID = decoded.sid;

        next();
    });
};