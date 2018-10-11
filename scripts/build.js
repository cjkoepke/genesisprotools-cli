var shell     = require('shelljs');
var fs        = require('fs');
var constants = require( '../constants');

module.exports = {
    composer: function(args) {

        // Make executable.
        shell.exec( `sudo chmod +x ${__dirname}/shell/composer.sh` );

        // Execute.
        shell.exec( `sudo ${__dirname}/shell/composer.sh ${args.slug} ${args.version} ${process.cwd()}`);

        // Make read-only.
        shell.exec( `sudo chmod +r ${__dirname}/shell/composer.sh` );

        if ( ! args.token ) {
            shell.exec(`composer config --global --auth http-basic.genesis-pro-tools.repo.packagist.com token ${args.token}`);
        }
        
        shell.exec(`composer install`);
        
    },
    files: function() {

        // Abort if dependencies not installed.
        if ( ! fs.existsSync(`${constants.vendor_path}`) ) {
            console.log('You must setup required Genesis Pro Tools dependencies first.\nRun `gpt setup`');
            return;
        }

        /**
         * Execute all shell scripts in the Genesis Pro Tools /scripts/file/ folder.
         * 
         * @since 1.0.0
         */
        shell
            .ls(`${constants.vendor_path}/scripts/files/*.sh`)
            .forEach(function(file_path) {

                // Make executable.
                shell.exec(`sudo chmod +x ${file_path}`);

                // Execute.
                shell.exec(`sudo ${file_path}`);

                // Make read-only.
                shell.exec(`sudo chmod +r ${file_path}`);

        });

    }
}