/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');

module.exports = {
    'google' : function(req, res){
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        console.log(req.body.clientId);
        var params = {
           client_id: req.body.clientId,
            // client_id : '1081450147778-vhfd66man02n6r64um8fstgbgkf2asp8.apps.googleusercontent.com',
            redirect_uri: req.body.redirectUri,
            // client_secret: sails.config.local,
            client_secret: 'DrZt_j1ZfLshKcOHS7tv5C73',
            code: req.body.code,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {

            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {

                // Step 3a. If user is already signed in then link accounts.
                console.log(profile);
                if (req.headers.authorization) {
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                        }

                        var token = req.headers.authorization.split(' ')[1];
                        var userID;
                        TokenService.verifyToken(token, function(err, decoded) {
                            if (err) return res.json(401, { err: 'The token is not valid' });

                            userID = decoded;

                            next();
                        });
                        User.update(userID, {
                            google: profile.sub,
                            displayName : displayName || profile.name
                        }, function userUpdated(err, updated) {
                            console.log(updated[0].displayName + ' user updated');
                            res.send({ token: TokenService.issueToken(updated[0].id) });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            console.log('existing user ' + existingUser.displayName);
                            return res.json({user: existingUser, token: TokenService.issueToken({sid: existingUser.id})});
                        }
                        User.create({
                            google: profile.sub,
                            displayName: profile.name,
                            firstName: profile.given_name,
                            lastName: profile.family_name,
                            picture: profile.picture,
                            email: profile.email
                        }, function userCreated(err, user){
                            console.log('new user id' + user.id);
                            res.json({user: user, token: TokenService.issueToken({sid: user.id})});
                        });
                    });
                }
            });
        });
    }
};

