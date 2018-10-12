#!/usr/bin/env node
var program = require('yargs');
var shell   = require('shelljs');

// Modules
var core    = require('./src/core');
var uno     = require('./src/uno');

program
    .version('0.1.0')
    .command('install [module]', 'Install Genesis Pro Tool modules.', {
        core: {
            alias: 'c',
            describe: 'The core Genesis Pro Tool module (required).'
        },
        uno: {
            alias: 'u',
            describe: 'The Uno starter theme module.'
        }
    }, function(argv) {

        /**
         * Build a command pipeline to install multiple modules in order.
         * 
         * @since 1.0.0
         */
        var commands = [];
        
        if ( argv.core ) {
            commands.push(core);
        }

        if ( argv.uno ) {
            commands.push(uno);
        }

        commands.reduce(function(promiseChain, command) {
            return promiseChain.then(() => command())
        }, Promise.resolve());

    })
    .help()
    .argv