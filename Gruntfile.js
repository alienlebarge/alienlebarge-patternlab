module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    




    // SASS is all about stylesheets
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'source/css/style.min.css': 'source/css/style.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'source/css/style.css': 'source/css/style.scss'
        }
      }
    },




    // Patternlab is build with the terminal
    shell: {
      buildPatternLab: {
        command: 'php core/builder.php -g'
      }
    }





  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "shell" task.
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'shell']);

};