'use strict';

module.exports = function (grunt) {

    // Unified Watch Object
    var watchFiles = {
        serverJS: ['server/*.js', 'server/**/*.js', 'conf/*.js', 'index.js'],
        serverTests: ['test/*_spec.js'],
        serverConfig: ['conf/*','conf/**/*'],
        ignores: ['node_modules/**', '.git/**', '.idea/', '.cache/', '.tmp/']
    };

    var allFiles = watchFiles.serverTests
        .concat(watchFiles.serverJS);

    // Project Configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /*
         * JSLint
         * ===========================================
         */
        // region JSLint, jscs, jsbeautifier definition
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: {
                src: allFiles,
                options: {
                    jshintrc: true
                }
            },
            test: {
                src: watchFiles.serverTests,
                options: {
                    jshintrc: true
                }
            }
        },
        jsbeautifier: {
            options: {
                js: {
                    braceStyle: 'collapse',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: true,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            },
            all: {
                src: allFiles
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: {
                src: allFiles
            }
        },
        // endregion

        // region nodemon, watch, istanbul
        nodemon: {
            dev: {
                script: 'bin/standalone',
                options: {
                    args: ['--debug'],
                    ext: 'js,yaml',
                    ignore: ['node_modules/**', '.git/**', '.idea', '.cache', '.tmp', 'coverage', 'docs', 'logs', '~references'],
                    watch: ['conf', 'server', 'public'],
                    debug: true,
                    delayTime: 15,
                    env: {
                        NODE_ENV: 'development'
                    },
                    cwd: __dirname
                }
            }
        },

        env: {
            test: {
                NODE_ENV : 'development'
            }
        },

        watch: {
            test: {
                files: allFiles.concat(watchFiles.serverConfig),
                tasks: ['newer:jshint:test', 'mocha_istanbul:test']
            }
        },

        mocha_istanbul: {
            test: {
                src: ['test'], // a folder works nicely
                options: {
                    reporter: 'spec',
                    coverage: false
                    //root: './lib'
                }
            },
            teamcity: {
                src: ['test'], // a folder works nicely
                options: {
                    reporter: 'mocha-teamcity-reporter',
                    coverage: false,
                    check: {
                        lines: 60,
                        statements: 60,
                        branches: 30,
                        functions: 60
                    },
                    //root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['teamcity', 'html']
                }
            }
        }
        // endregion
    });

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.event.on('coverage', function(lcov, done){
        require('coveralls').handleInput(lcov, function(err){
            if (err) {
                return done(err);
            }
            done();
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['nodemon:dev']);
    grunt.registerTask('test', ['env:test', 'mocha_istanbul:test', 'watch:test']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'jscs', 'jsbeautifier']);

    // We don't need setup a test server here because we use injection to the server instance directly
    grunt.registerTask('teamcity', ['mocha_istanbul:teamcity']);

};
