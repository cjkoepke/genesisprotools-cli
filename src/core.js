const fs       = require('fs');
const shell    = require('shelljs');
const inquirer = require('inquirer');
const paths    = require('../paths');

/**
 * Installs default composer.json file and initiates installation.
 * 
 * @since 1.0.0
 */
module.exports = () => {
    
    return new Promise(function(resolve, reject) {

        if ( fs.existsSync(`${process.cwd()}/composer.json`) ) {
            if ( shell.exec(`composer require gpt/core`).code === 0 && fs.existsSync(`${paths.vendor_path}/core/`) ) {
                return resolve('Core theme package added.');
            } else {
                return reject('Could not install Core Theme package.');
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

                if ( ! fs.existsSync(`${process.cwd()}/composer.json`) ) {
                    shell
                        .cat(`${paths.root_path}/templates/composer.json`)
                        .sed(/\${NAME}/, args.name.toString())
                        .to(`${process.cwd()}/composer.json`);
                }

            })
            .then(function() {
                if ( shell.exec('composer require gpt/core').code !== 0 ) {
                    console.log('Composer could not install Core package. Please run `gpt config` and try again.');
                    shell.exit(1);
                }
            })
            .then(function() {
                if ( fs.existsSync(`${paths.vendor_path}/core/`) ) {
                    return resolve('Successfully installed!');
                } else {
                    return reject('Core Theme module not installed.');
                }
            })
            .catch(function(e){
                console.log(e);
                return reject();
            });
        
    }).catch(function() {});

}