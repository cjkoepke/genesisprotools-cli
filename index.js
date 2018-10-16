#!/usr/bin/env node
const program = require('yargs');
const exists  = require('command-exists');
const chalk   = require('chalk');
const link    = require('terminal-link');
const user    = require('./user');

/**
 * Make sure Composer is available.
 * 
 * @since 1.0.0
 */
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

/**
 * Make sure user is configured.
 * 
 * @since 1.0.0
 */
if ( ! user ) {
    config();
}

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
    .command('theme', 'Install Genesis Pro Tool modules for theme development.', {}, function(argv) {

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
            return promiseChain
                .then(() => command())
                .catch(e => console.log(e))
        }, Promise.resolve());

    })
    .command('config', 'Configure your GPT account credentials.', {}, function() {
        
        // We check config at the first operation, so abort this override.
        if ( ! user ) {
            return;
        }

        config();

    })
    .argv