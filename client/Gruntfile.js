module.exports = function(grunt) {
  var angularBase = 'node_modules/angular/angular.min.js';
  var angularModules = 'node_modules/angular*/*.min.js';
  var appModule = 'app/js/app.js';
  var templates = 'build/js/templates.js';
  var services = 'app/js/service/*.js';
  var filters = 'app/js/filter/*.js';
  var directives = 'app/js/directives/*.js';
  var controllers = 'app/js/controller/*.js';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: ['app/js/**/*.js']
    },
    ngtemplates: {
      app: {
        options: {
          prefix: '/',
          module: 'fingertips'
        },
        src: ['app/view/**/*.html'],
        dest: templates
      }
    },
    concat: {
      js: {
        src: [
          angularBase,
          angularModules,
          appModule,
          templates,
          services,
          filters,
          directives,
          controllers
        ],
        dest: 'build/js/app.js'
      },
      css: {
        src: ['app/css/app.css', 'app/css/**/*.css'],
        dest: 'build/css/app.css'
      }
    },
    uglify: {
      app: {
        src: ['build/js/app.js'],
        dest: 'build/js/app.min.js'
      }
    },
    cssmin: {
      target: {
        files: {
          'build/css/app.min.css': 'build/css/app.css'
        }
      }
    },
    copy: {
      options: { force: true },
      index: {
        files: [{
          cwd: 'app/',
          expand: true,
          src: 'index.html',
          dest: '../public/'
        }]
      },
      js: {
        files: [{
          cwd: 'build/js',
          expand: true, 
          src: 'app.min.js',
          dest: '../public/js/'
        }]
      },
      css: {
        files: [{
          cwd: 'build/css',
          expand: true, 
          src: 'app.min.css',
          dest: '../public/css/'
        }]
      }
    },
    clean: {
      options: { force: true },
      js: {
        src: ['../public/js/*.js']
      },
      css: {
        src: ['../public/css/*.css']
      },
      index: {
        src: ['../public/index.html']
      }
    },
    watch: {
      js: {
        files: ['app/js/**/*.js'],
        tasks: ['js', 'clean:js', 'copy:js']
      },
      css: {
        files: ['app/css/**/*.css'],
        tasks: ['css', 'clean:css', 'copy:css']
      },
      view: {
        files: ['app/view/**/*.html'],
        tasks: ['view', 'clean:js', 'copy:js']
      },
      index: {
        files: ['app/index.html'],
        tasks: ['clean:index', 'copy:index']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('start', ['build', 'watch']);
  grunt.registerTask('css', ['concat:css', 'cssmin']);
  grunt.registerTask('js', ['jshint', 'concat:js', 'uglify']);
  grunt.registerTask('view', ['ngtemplates', 'concat', 'uglify']);
  grunt.registerTask('deploy', ['ngtemplates', 'concat', 'uglify']);
  grunt.registerTask('build', ['jshint', 'ngtemplates', 'concat', 'uglify', 'cssmin', 'clean', 'copy']);
};