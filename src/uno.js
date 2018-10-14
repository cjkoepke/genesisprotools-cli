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

        /**
         * Prompt user to install core dependencies if not installed.
         * 
         * @since 1.0.0
         */
        if ( ! fs.existsSync(`${paths.vendor_path}/core`) ) {
            console.log(chalk.yellow('Uno requires the Core package.\n') + 'Run `gpt install --core`.');
        }


        /**
         * If Uno is already installed, just copy files.
         * 
         * @since 1.0.0
         */
        if ( fs.existsSync(`${paths.vendor_path}/uno/src`) ) {
            if ( shell.cp(`-R`, `${paths.vendor_path}/uno/src/*`, './').code === 0 ) {
                console.log(chalk.green.bold('Uno files successfully generated.'));
                return resolve();
            } else {
                return reject();
            }
        }

        console.log('Now building Uno theme files...');
        
        /**
         * Copy over the Uno starter theme in the gpt/uno package.
         * 
         * @since 1.0.0
         */
        if ( shell.exec('composer require gpt/uno:dev-master').code === 0 ) {
            if ( shell.cp(`-R`, `${paths.vendor_path}/uno/src/*`, './').code === 0 ) {
                console.log(chalk.green.bold('Uno files successfully generated.'));
                resolve();
            } else {
                reject();
            }
        }

    }).catch(function() {});

}