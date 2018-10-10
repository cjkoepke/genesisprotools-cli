var shell     = require('shelljs');
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
    functions: function() {

        // Make executable.
        shell.exec( `sudo chmod +x ${constants.vendor_path}/scripts/shell/functions.sh` );

        // Execute.
        shell.exec(`sudo ${constants.vendor_path}/scripts/shell/functions.sh`);

        // Make read-only.
        shell.exec( `sudo chmod +r ${constants.vendor_path}/scripts/shell/functions.sh` );

    }
}