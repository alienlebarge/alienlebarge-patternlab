module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),





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





    // Styleguide
    styleguide: {

      dist: {
          options: {
              // task options
              template: {
                include: ['source/css/style.css']
              }
          },
          files: {
              'styleguide': 'source/css/style.scss'
          }
      }

    },



    // Publish the public folder using gh-pages
    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    },






    // Watch things and do things when it happens.
    watch: {
      dev: {
        files: ['source/**/*.*'],
        tasks: ['sass:dev', 'shell:buildPatternLab', 'styleguide:dist'],
        options: {
          spawn: false,
        },
      },
    },





    clean: {
      jekyllStylesheets : {
        options: {
          force: true
        },
        src: ["<%= config.jekyllfolder %>stylesheets/"]
      }
    },





    copy: {
      stylesheets: {
        expand: true,
        cwd: 'source/css/',
        src: ['*.css', 'README.md'],
        dest: '<%= config.jekyllfolder %>stylesheets/'
      }
    }





  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "shell" task.
  grunt.loadNpmTasks('grunt-shell');
  // Load the plugin that provides the "stylguide" task.
  grunt.loadNpmTasks('grunt-styleguide');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "gh-pages" task.
  grunt.loadNpmTasks('grunt-gh-pages');
  // Load the plugin that provides the "grunt-contrib-clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that provides the "grunt-contrib-copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s)
  grunt.registerTask('default', ['sass', 'shell', 'styleguide']);

  // Dev watch task. Build the style, patternlab and styleguide
  grunt.registerTask('dev-watch', ['watch']);

  // Build the dist an publish it
  grunt.registerTask('dist', ['sass', 'shell', 'gh-pages']);

  // Transfer to jekyll
  grunt.registerTask('jekyll', ['sass', 'clean:jekyllStylesheets', 'copy']);

};
