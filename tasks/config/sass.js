module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
      options: {
        require: 'susy'
      },
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['importer.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};