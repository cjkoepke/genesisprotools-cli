var shell  = require('shelljs');
var prompt = require('promptly');
var args   = {};

prompt.prompt('Repository Slug [john-smith]: ')
    .then(function(slug) {
        args.slug = slug;
    })
    .then(function() {
        prompt.prompt('Genesis Pro Tools Version [1.0.0]: ', {default: '^1.0'})
            .then(function(version) {
                args.version = version;
            })
            .then(function() {
                prompt.prompt('Your unique access token for Genesis Pro Tools: ', {default: "undefined"})
                    .then(function(token) {
                        args.token = token;
                    })
                    .then(function() {

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

                    })
                    .catch(function(){
                        console.log('\nAborted.');
                    });
            })
            .catch(function(e){
                console.log(e);
                console.log('\nAborted.');
            });
    })
    .catch(function(){
        console.log('\nAborted.');
    });