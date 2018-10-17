const shell        = require('shelljs');
const fs           = require('fs');
const paths        = require('../paths');
const chalk        = require('chalk');
const inquirer     = require('inquirer');
const {spawn}      = require('child_process');
const themeReplace = require('../utilities/theme-replace');

/**
 * Copies over starter theme files.
 * 
 * @since 1.0.0
 */
module.exports = () => {

    return new Promise(function(resolve, reject) {

        /**
         * Prompt user to install core dependencies if not installed.
         * 
         * @since 1.0.0
         */
        if ( ! fs.existsSync(`${paths.vendor_path}/core`) ) {
            return inquirer.prompt({
                type: 'confirm',
                message: 'Uno requires the Core package. ' + chalk.yellow('Install now?'),
                name: 'install',
                default: true
            })
                .then(res => {
                    if ( res.install ) {
                        const installed = spawn('gpt install --core', {
                            stdio: 'inherit',
                            shell: true
                        });
                        installed.on('exit', function(code, signal) {
                            if ( code === 0 ) {
                                console.log(
                                    chalk.yellow('Now generating Uno theme files...')
                                );

                                copyUnoFiles(resolve, reject);
                            }
                        })
                    }
                })
                .then(function() {

                });
        } else {

            /**
             * If Uno is already installed, just copy files.
             * 
             * @since 1.0.0
             */
            copyUnoFiles(resolve, reject)

        }

    }).catch(function(e) {console.log(e)});

    /**
     * Copies Uno files from the Core package directory to current working directory.
     * 
     * @since 1.0.0
     */
    function copyUnoFiles(resolve, reject) {
        
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Theme Slug:',
                default: 'uno',
                name: 'slug'
            },
            {
                type: 'input',
                message: 'Theme Name:',
                default: 'Uno',
                name: 'name'
            }
        ])
            .then(function(args) {

                console.log(chalk.yellow('Generating Uno theme files...'));

                // Copy template.
                shell.cp(`-R`, `${paths.vendor_path}/core/uno/*`, process.cwd());

                if ( args.slug === 'uno' ) {
                    console.log(chalk.green('Done!'));
                    return;
                }
                
                // Replace copied file slugs with user input.
                themeReplace( 'uno', args.slug );
                themeReplace( 'Uno', args.name );

            })
            .then(function() {
                console.log(chalk.yellow('Now installing Node Modules and building assets...'))
                const assets = spawn(`npm install && gulp build`, {
                    stdio: 'inherit',
                    shell: true
                })
                assets.on('exit', function(code) {
                    if ( code === 0 ) {
                        resolve('Uno starter files successfully generated!')
                    }
                })
            })
            .catch(function(e) {
                console.log(e);
                reject('Something went wrong. Make sure Node and Composer are both installed.')
            });
    }

}