module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jekyllFolder: '../alienlebargegithub/'





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
      },
      buildStyleguide: {
        // The following command need `https://github.com/1026/kss-node-template-such-as-github` template in `~/Documents/Developpement/`
        command: 'kss-node source/css styleguide --css source/css/style.css --template ~/Documents/Developpement/kss-node-template-such-as-github/template'
        // Default template
        //command: 'kss-node source/css styleguide --css source/css/style.css'
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
      scripts: {
        files: ['source/**/*.*'],
        tasks: ['sass:dev', 'shell'],
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
        src: ["<%= jekyllFolder %>stylesheets/"]
      }
    },





    copy: {
      stylesheets: {
        expand: true,
        cwd: 'source/css/',
        src: ['**'],
        dest: '<%= jekyllFolder %>sstylesheets/'
      }
    }





  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "shell" task.
  grunt.loadNpmTasks('grunt-shell');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "gh-pages" task.
  grunt.loadNpmTasks('grunt-gh-pages');
  // Load the plugin that provides the "grunt-contrib-clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that provides the "grunt-contrib-copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'shell']);

  // Build the dist an publish it
  grunt.registerTask('dist', ['sass', 'shell', 'gh-pages']);

  // Transfer to jekyll
  grunt.registerTask('jekyll', ['sass', 'clean:jekyllStylesheets', 'copy']);

};
