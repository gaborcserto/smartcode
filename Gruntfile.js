'use strict';
module.exports = function (grunt) {

    var ASSETS = 'assets',
        STYLE_FOLDER = ASSETS + '/css/',
        VENDOR_FOLDER = ASSETS + '/vendor/';


    /**
     * Initialize grunt
     */
    grunt.initConfig({

        /**
         * Read package.json
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Set directory paths
         */
        dir: {
            js: 'assets/js',
            css: 'assets/css',
            sass: 'assets/scss',
            img: 'assets/img'
        },

        /**
         * JSHint
         */
        jshint: {
            gruntfile: 'Gruntfile.js',
            files: ['<%= dir.js %>/src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        /**
         * Concatenate
         */
        concat: {
            options: {
                stripBanners: true
            },
            js: {
                src: '<%= jshint.files %>',
                dest: '<%= dir.js %>/<%= pkg.name %>.js'
            }
        },


        /**
         * Sass compiling
         */
        sass: {
            options: {
                sourcemap: true
            },
            dist: {
                files: {
                    '<%= dir.css %>/style.css': '<%= dir.sass %>/style.scss'
                }
            }
        },

        /**
         * CSS min
         */
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                sourceMap: true
            },
            target: {
                files: {
                    '<%= dir.css %>/style.min.css': ['<%= dir.css %>/style.css']
                }
            }
        },

        /**
         * Make CSS dir
         */
        mkdir: {
            all: {
                options: {
                    create: [STYLE_FOLDER, VENDOR_FOLDER]
                }
            }
        },

        /**
         * Minify
         */
        uglify: {
            // Minify js files in js/src/
            dist: {
                src: ['<%= dir.js %>/<%= pkg.name %>.js'],
                dest: '<%= dir.js %>/<%= pkg.name %>.min.js'
            }
        },

        /**
         * Watch
         * @github.com/gruntjs/grunt-contrib-watch
         */
        watch: {

            // JShint Gruntfile
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },

            // Compile Sass dev on change
            sass: {
                files: '<%= dir.sass %>/**/*',
                tasks: ['sass:dev']
            },

            // JShint, concat + uglify JS on change
            js: {
                files: '<%= jshint.files %>',
                tasks: [/*'jshint', */'concat', 'uglify']
            },

            // Live reload files
            livereload: {
                options: {livereload: true},
                files: [
                    '<%= dir.css %>/**/*.css',                    // all .css files in css/ dir
                    '<%= dir.js %>/**/*.js',                      // all .js files in js/ dir
                    '**/*.{html,php}'                             // all .html + .php files
                ]
            }
        }
    });

    /**
     * Default Task
     * run `grunt`
     */
    grunt.registerTask('default', [
        'concat:js',        // Concatenate main JS files
        'uglify',           // Minifiy concatenated JS file
        'sass',         // Compile Sass with dev settings
        'cssmin'
    ]);

    grunt.registerTask('setup', [
        'concat:js',        // Concatenate main JS files
        'uglify',           // Minifiy concatenated JS file
        'sass',         // Compile Sass with dev settings
        'cssmin',
        'mkdir'
    ]);

    /**
     * Load the plugins specified in `package.json`
     */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-sass');
};