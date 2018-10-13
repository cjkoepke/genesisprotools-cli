#!/usr/bin/env node
const program = require('yargs');
const exists  = require('command-exists');
const chalk   = require('chalk');
const link    = require('terminal-link');

if ( ! exists('composer') ) {
    console.log(link( 
        chalk.yellow('Oops! Composer is a required dependency for GPT!'),
        'https://docs.genesisprotools.com/requirements'
    ));
    process.exit(1);
}

// Modules
const core    = require('./src/core');
const uno     = require('./src/uno');
const config  = require('./src/config');

program
    .version('0.1.0')
    .option( 'core', {
        alias: 'c',
        description: 'Install the Genesis Pro Tools core module.'
    })
    .option( 'uno', {
        alias: 'u',
        description: 'Install the Genesis Pro Tools starter theme.'
    })
    .command('install', 'Install Genesis Pro Tool modules.', {}, function(argv) {

        /**
         * Build a command pipeline to install multiple modules in order.
         * 
         * @since 1.0.0
         */
        let commands = [];
        
        if ( argv.core ) {
            commands.push(core);
        }

        if ( argv.uno ) {
            commands.push(uno);
        }

        // Shortcut for core dependency.
        if ( commands.length === 0 ) {
            commands.push(core);
        }

        commands.reduce(function(promiseChain, command) {
            return promiseChain.then(() => command(program))
        }, Promise.resolve());

    })
    .command('config', 'Configure your GPT account credentials.', {}, config)
    .argv