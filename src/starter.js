var shell     = require('shelljs');
var fs        = require('fs');
var constants = require('../constants');

/**
 * Copies over starter theme files.
 * 
 * @since 1.0.0
 */
module.exports = () => {

    return new Promise(function(resolve, reject) {

        if ( ! fs.existsSync(`${constants.vendor_path}`) ) {

            /**
             * Prompt user to install core dependencies if not installed.
             * 
             * @since 1.0.0
             */
            console.log('Starter theme files require core dependencies. Run `gpt core` to install.');
            reject();
            shell.exit(1);

        } else {

            console.log('Now building boilerplate files...');
            
            /**
             * Execute all shell scripts in the Genesis Pro Tools /scripts/files/starter/ folder.
             * 
             * @since 1.0.0
             */
            if ( shell.cp(`-R`, `${constants.vendor_path}/files/starter/*`, './').code === 0 ) {
                resolve();
            } else {
                reject();
            }

        }

    }).catch(function() {});

}