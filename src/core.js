const fs       = require('fs');
const shell    = require('shelljs');
const inquirer = require('inquirer');
const paths    = require('../paths');
const user     = require('../user');

/**
 * Installs default composer.json file and initiates installation.
 * 
 * @since 1.0.0
 */
module.exports = () => {
    
    return new Promise(function(resolve, reject) {

        if ( fs.existsSync(`${process.cwd()}/composer.json`) ) {
            if ( shell.exec(`composer require gpt/core:dev-master`).code === 0 && fs.existsSync(`${paths.vendor_path}/core/`) ) {
                return resolve('Succesfully added core module.');
            } else {
                return reject('Could not install core module.');
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

        return inquirer.prompt(queries)
            .then(function(args) {
                shell
                    .cat(`${paths.root_path}/templates/composer.json`)
                    .sed(/\${NAME}/, args.name.toString())
                    .sed(/\${USERNAME}/, user.username.toString())
                    .to(`${process.cwd()}/composer.json`)
                    .exec('composer require gpt/core:dev-master');

            })
            .then(function() {
                if ( fs.existsSync(`${paths.vendor_path}/core/`) ) {
                    return resolve('Successfully installed!');
                } else {
                    return reject('Core module not installed.');
                }
            })
            .catch(function(e){
                console.log(e);
                return reject();
            });
        
    }).catch(function() {});

}