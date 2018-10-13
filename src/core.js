const fs       = require('fs');
const shell    = require('shelljs');
const inquirer = require('inquirer');
const paths    = require('../paths');
const creds    = require('../credentials');

/**
 * Installs default composer.json file and initiates installation.
 * 
 * @since 1.0.0
 */
module.exports = () => {
    
    return new Promise(function(resolve, reject) {

        if ( fs.existsSync(`${process.cwd()}/composer.json`) ) {
            if ( shell.exec(`composer require gtp/core`).code === 0 ) {
                resolve();
            } else {
                reject();
            }
        }

        let queries = [
            {
                type: 'input',
                message: 'Project Name:',
                default: 'vendor/name',
                name: 'name'
            }
        ]

        inquirer.prompt(queries)
            .then(function(args) {
                shell
                    .cat(`${paths.root_path}/files/composer.json`)
                    .sed(/\${NAME}/, args.name.toString())
                    .sed(/\${USERNAME}/, creds.username.toString())
                    .to(`${process.cwd()}/composer.json`)
                    .exec('composer require gpt/core');

            })
            .then(function() {
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