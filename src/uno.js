const shell = require('shelljs');
const fs    = require('fs');
const paths = require('../paths');
const chalk = require('chalk');

/**
 * Copies over starter theme files.
 * 
 * @since 1.0.0
 */
module.exports = program => {

    return new Promise(function(resolve, reject) {

        if ( ! fs.existsSync(`${paths.vendor_path}/core/files/uno`) ) {

            /**
             * Prompt user to install core dependencies if not installed.
             * 
             * @since 1.0.0
             */
            console.log(chalk.yellow('Starter theme files require core dependencies.\n') + 'Run `gpt --help`.');
            reject();
            shell.exit(1);

        } else {

            console.log('Now building boilerplate files...');
            
            /**
             * Copy over the Uno starter theme in the gpt/core package.
             * 
             * @since 1.0.0
             */
            if ( shell.cp(`-R`, `${paths.vendor_path}/core/files/uno/*`, './').code === 0 ) {
                console.log(chalk.green.bold('Uno successfully installed.'));
                resolve();
            } else {
                reject();
            }

        }

    }).catch(function() {});

}