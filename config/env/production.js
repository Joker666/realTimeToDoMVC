/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
     connection: 'mongoProd'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: process.env.PORT || 1337,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
    level: "verbose"
  },

    //keys
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'DrZt_j1ZfLshKcOHS7tv5C73',
    CLIENT_ID: process.env.CLIENT_ID || '1081450147778-vhfd66man02n6r64um8fstgbgkf2asp8.apps.googleusercontent.com'

};
