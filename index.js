#!/usr/bin/env node
var program   = require('commander');
var fs        = require('fs');
var prompt    = require('promptly');

// Tools
var constants = require('./constants');
var build     = require('./scripts/build');

program
    .version('0.1.0')
    .arguments('<cmd>')
    .option('-f --files', 'Build starter theme files.')
    .option('-c --composer', 'Generate defualt composer file and install dependencies.')
    .action(function(cmd) {
        
        switch( cmd ) {

            /**
             * Generate starter theme files.
             * 
             * @since 1.0.0
             */
            case 'files':
                build.files();
                break;

            /**
             * Generate composer.json and initiate installation.
             * 
             * @since 1.0.0
             */
            case 'setup':
                var args = {};
                prompt.prompt('Repository Slug [john-smith]: ')
                    .then(function(slug) {
                        args.slug = slug;
                    })
                    .then(function() {
                        prompt.prompt('Genesis Pro Tools Version [1.0.0]: ', {default: '^1.0'})
                            .then(function(version) {
                                args.version = version;
                            })
                            .then(function() {
                                prompt.prompt('Your unique access token for Genesis Pro Tools: ', {default: "undefined"})
                                    .then(function(token) {
                                        args.token = token;
                                    })
                                    .then(function() {

                                        // Initiate the script.
                                        build.composer(args)

                                    })
                                    .catch(function(){
                                        console.log('\nAborted.');
                                    });
                            })
                            .catch(function(e){
                                console.log(e);
                                console.log('\nAborted.');
                            });
                    })
                    .catch(function(){
                        console.log('\nAborted.');
                    });
                    break;
                
            default:
                console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
                process.exit(1);
        }

    })
    .parse(process.argv);