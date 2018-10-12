var shell    = require('shelljs');
var inquirer = require('inquirer');
var exists   = require('command-exists');
var chalk    = require('chalk');
var link     = require('terminal-link');

/**
 * Installs default composer.json file and initiates installation.
 * 
 * @since 1.0.0
 */
module.exports = () => {
    
    return new Promise(function(resolve, reject) {

        inquirer.prompt([
            {
                type: 'input',
                message: 'Repository Slug:',
                name: 'slug',
            },
            {
                type: 'input',
                message: 'Genesis Pro Tools Version:',
                default: '^1.0',
                name: 'version'
            },
            {
                type: 'input',
                message: 'Your unique access token for Genesis Pro Tools []:',
                default: false,
                name: 'token'
            }
        ])
            .then(function(args) {
                
                shell.exec( `sh ${__dirname}/../shell/composer.sh ${args.slug} ${args.version} ${process.cwd()}`);

                if ( ! exists('composer') ) {
                    console.log(link( 
                        chalk.yellow('Oops! Composer is a required dependency for GPT!'),
                        'https://docs.genesisprotools.com/requirements'
                    ));
                    shell.exit(1);
                }

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
        
    }).catch(function() {});

}