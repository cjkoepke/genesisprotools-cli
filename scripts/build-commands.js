var shell     = require('shelljs');
var constants = require( '../constants');
var path      = require('path');
var fs        = require('fs');
var prompt    = require('promptly');

module.exports = {
    composer: function() {

        var name = 'your-name/theme';
        prompt.start();

        prompt.get(['name'], function(err, response) {
            name = response;
        });

        return new Promise(function(resolve, reject) {
            if ( shell.exec(`sudo ${path.resolve(__filename)}/scripts/shell/composer.sh ${name}`).code !== 0 ) {
                if ( fs.existsSync( `../composer.json` ) ) {
                    resolve();
                }
            } else {
                reject();
            }
        });
        
    },
    functions: function() {
        shell.exec(`sudo ${constants.vendor_path}/scripts/shell/functions.sh`);
    }
}