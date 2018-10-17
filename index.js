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
    'core-theme':   require('./src/core')
}

// Theme commands
const theme = {
    'start': require('./src/uno'),
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
    .command('install [modules..]', 'Install Genesis Pro Tool Composer packages.', {}, function(argv) {
        
        if ( argv.modules ) {
            argv.modules.forEach(module => {
                modules[module]()
                    .then(msg => console.log(chalk.green.bold('Success: ') + msg))
                    .catch(e => console.log(e));
            })
        }

    })
    .command('theme <cmd>', 'Perform theme-level commands.', {}, function(argv) {

        if ( argv.cmd ) {
            theme[argv.cmd]()
                .then(msg => console.log(chalk.green.bold('Success: ') + msg))
                .catch(e => console.log(e));
        }

    })
    .command('setup', 'Configure your GPT account credentials.', {}, function() {
        
        // We check config at the first operation, so abort this override.
        if ( ! user ) {
            return;
        }

        setup.config();

    })
    .argv;