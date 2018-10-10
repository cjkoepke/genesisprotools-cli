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
    .action(function(cmd) {
        
        switch( cmd ) {
            case 'init':
                
                // If vendor path not found, request generation of composer.
                if ( ! fs.existsSync(constants.vendor_path) ) {
                
                    prompt.confirm('Genesis Pro Tools are not installed. Would you like us to do it for you?')
                        .then(function(res) {
                            if ( ! res ) {
                                return;
                            }

                            prompt.prompt('Project name (must follow vendor/name pattern): ')
                                .then(function(name) {
                                    shell.exec( `sudo chmod +x ${__dirname}/scripts/shell/composer.sh` );
                                    shell.exec( `sudo ${__dirname}/scripts/shell/composer.sh ${name} ${process.cwd()}`);
                                    shell.exec( `composer install` );
                                })
                        });

                    return;
                }
            
                // Build Theme Files.
                build.functions();

                break;
            default:
                console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
                process.exit(1);
        }

    })
    .parse(process.argv);