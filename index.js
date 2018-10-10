#!/usr/bin/env node
var program   = require('commander');
var shell     = require('shelljs');
var fs        = require('fs');
var prompt    = require('promptly');

// Tools
var constants = require('./constants');
var build     = require('./scripts/build-commands');

program
    .version('0.1.0')
    .arguments('<cmd>')
    .option('-f --files', 'Build starter theme files.')
    .option('-c --composer', 'Generate defualt composer file and install dependencies.')
    .action(function(cmd) {
        
        switch( cmd ) {
            case 'start':
                
                // If vendor path not found, request generation of composer.
                if ( ! fs.existsSync(constants.vendor_path) && ! program.composer ) {
                
                    prompt
                        .confirm('Genesis Pro Tools are not installed. Would you like us to do it for you [y/n]?')
                        .then(function(res) {
                            if ( ! res ) {
                                return;
                            }

                            prompt.prompt('Package Name [vender/name]: ')
                                .then(function(name) {
                                    build.composer({name: name});
                                })
                                .then(function() {
                                    build.functions();
                                });
                        })
                        .catch(function() {
                            console.log('\nAborted.');
                        })

                    return;
                }

                if ( program.composer ) {
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
                }
            
                // Build Theme Files.
                if ( program.files ) {
                    build.functions();
                }

                break;
                
            default:
                console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
                process.exit(1);
        }

    })
    .parse(process.argv);