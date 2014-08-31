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

        var params = {
            client_id: req.body.clientId,
            redirect_uri: req.body.redirectUri,
            //client_secret: config.secrets.GOOGLE_SECRET,
            client_secret: 'oiTGCZkWUWfpTxURl_cRkJoC',
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
                        sailsTokenAuth.verifyToken(token, function(err, decoded) {
                            if (err) return res.json(401, { err: 'The token is not valid' });

                            userID = decoded;

                            next();
                        });

                        User.findById(userID, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.google = profile.sub;
                            user.displayName = user.displayName || profile.name;
                            user.save(function(err) {
                                res.send({ token: sailsTokenAuth.issueToken(user.id) });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            return res.send({ token: sailsTokenAuth.issueToken(existingUser.id) });
                        }
                        User.create({
                            google: profile.sub,
                            displayName: profile.name
                        }, function userCreated(err, user){
                            res.send({ token: sailsTokenAuth.issueToken(user.id) });
                        });
                    });
                }
            });
        });
    }
};

