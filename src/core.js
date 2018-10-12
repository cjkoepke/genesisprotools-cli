var shell  = require('shelljs');
var prompt = require('promptly');

/**
 * Installs default composer.json file and initiates installation.
 * 
 * @since 1.0.0
 */
module.exports = () => {
    return new Promise(function(resolve, reject) {
    
        var args   = {};
        prompt.prompt('Repository Slug [john-smith]: ')
            .then(function(slug) {
                args.slug = slug;
            })
            .then(function() {

                prompt
                    .prompt('Genesis Pro Tools Version [1.0.0]: ', {default: '^1.0'})
                    .then(function(version) {
                        args.version = version;
                    })
                    .then(function() {
                        prompt.prompt('Your unique access token for Genesis Pro Tools []: ', {default: "undefined"})
                            .then(function(token) {
                                args.token = token;
                            })
                            .then(function() {
                                
                                shell.exec( `sh ${__dirname}/../shell/composer.sh ${args.slug} ${args.version} ${process.cwd()}`);

                                if ( ! args.token ) {
                                    shell.exec(`composer config --global --auth http-basic.genesis-pro-tools.repo.packagist.com token ${args.token}`);
                                }

                                if ( shell.exec(`composer install`).code === 0 ) {
                                    resolve();
                                } else {
                                    reject();
                                }

                            })
                            .catch(function(){
                                reject();
                                console.log('\nAborted.');
                            });
                    })
                    .catch(function(e){
                        reject();
                        console.log('\nAborted.');
                    });

            })
            .catch(function(){
                reject();
                console.log('\nAborted.');
            });
        
    }).catch(function() {});

}