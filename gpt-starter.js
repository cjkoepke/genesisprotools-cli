var shell     = require('shelljs');
var fs        = require('fs');
var constants = require('./constants');

if ( ! fs.existsSync(`${constants.vendor_path}`) ) {

    /**
     * Prompt user to install core dependencies if not installed.
     * 
     * @since 1.0.0
     */
    console.log('Starter theme files require core dependencies. Run `gpt core` to install.');
    shell.exit(1);

} else {

    console.log('Now building boilerplate files...');
    
    /**
     * Execute all shell scripts in the Genesis Pro Tools /scripts/files/starter/ folder.
     * 
     * @since 1.0.0
     */
    shell.cp(`-R`, `${constants.vendor_path}/files/starter/*`, './');

}
