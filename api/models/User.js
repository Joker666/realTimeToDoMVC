/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    attributes: {
        email: { type: 'String', unique: true},
        displayName: { type: 'String' },
        firstName: { type: 'String' },
        lastName: { type: 'String' },
        picture: { type: 'String' },
        facebook: { type: 'String' },
        foursquare: { type: 'String' },
        google: { type: 'String' },
        github: { type: 'String' },
        linkedin: { type: 'String' },
        twitter: { type: 'String' },
    }
};

