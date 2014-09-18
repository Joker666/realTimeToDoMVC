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
    level: "info"
  },

    //keys
    // DB_URL: process.env.DB_URL || 'mongodb://root:root@ds035250.mongolab.com:35250/sails_realtime_todo_mvc',
    // GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'kSHmiX1NB6bPmabEcyGrvwb5',
    // CLIENT_ID: process.env.CLIENT_ID || '675547086019-cr33utqefoai0hmeaphr7eame3d1i5cn.apps.googleusercontent.com'

};
