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
const modules = {
    core:   require('./src/core')
}

// Utilities
const utilities = {
    uno: require('./src/uno'),
}

// Setup
const setup = {
    config: require('./src/config')
}

/**
 * Make sure user is configured.
 * 
 * @since 1.0.0
 */
if ( ! user ) {
    config();
}


/**
 * Install commands.
 * 
 * @since 1.0.0
 */
program
    .version('0.1.0')
    .option( 'modules', {
        type: 'array',
        alias: 'm',
        description: 'Names of modules to install.'
    })
    .command('install', 'Install Genesis Pro Tool Composer packages.', {}, function(argv) {
        
        if ( argv.modules ) {
            argv.modules.forEach(module => {
                modules[module]()
            })
        }

    })
    .argv;

/**
 * Theme commands.
 * 
 * @since 1.0.0
 */
program
    .option( 'uno', {
        type: 'boolean',
        description: 'Install the Genesis Pro Tools Uno theme files.'
    })
    .command('theme', 'Perform theme-level commands.', {}, function(argv) {

        if ( argv.uno ) {
            utilities.uno()
                .then(() => console.log(chalk.green('Success!')))
                .catch(e => console.log(e));
        }

    })
    .argv;

/**
 * Setup commands.
 * 
 * @since 1.0.0
 */
program
    .command('setup', 'Configure your GPT account credentials.', {}, function() {
        
        // We check config at the first operation, so abort this override.
        if ( ! user ) {
            return;
        }

        setup.config();

    })
    .argv