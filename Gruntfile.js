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
    },





    // Publish the public folder using gh-pages
    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    },





    // Generate stylguide
    styleguide: {
      dist: {
        options: {
          framework: {
            name: 'styledocco'
          },
          name: 'Style Guide',
          template: {
            include: ['source/css/style.css']
          },
        },
        files: {
          'docs': ['source/css/sass/**/*.scss']
        }
      }
    }






  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "shell" task.
  grunt.loadNpmTasks('grunt-shell');
  // Load the plugin that provides the "gh-pages" task.
  grunt.loadNpmTasks('grunt-gh-pages');
  // Load the plugin that provides the "stylguide" task.
  grunt.loadNpmTasks('grunt-styleguide');

  // Default task(s).
  grunt.registerTask('default', ['sass:dev', 'shell']);

  // Build the dist an publish it
  grunt.registerTask('dist', ['sass', 'shell', 'gh-pages']);

};
