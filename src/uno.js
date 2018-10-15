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

                                const uno = copyUnoFiles();

                                if ( uno.code === 0 ) {
                                    console.log(chalk.green.bold('Uno files successfully generated.'));
                                    return resolve();
                                } else {
                                    return reject();
                                }
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
            const uno = copyUnoFiles();

            if ( uno.code === 0 ) {
                console.log(chalk.green.bold('Uno files successfully generated.'));
                return resolve();
            } else {
                return reject();
            }

        }

    }).catch(function() {});

    /**
     * Copies Uno files from the Core package directory to current working directory.
     * 
     * @since 1.0.0
     */
    function copyUnoFiles() {
        
        inquirer.prompt([
            {
                type: 'input',
                message: 'Theme textdomain?',
                default: 'uno',
                name: 'textdomain'
            }
        ])
            .then(function(args) {

                console.log(chalk.yellow('Generating Uno theme files...'));

                // Copy template.
                shell.cp(`-R`, `${paths.vendor_path}/core/uno/*`, process.cwd());

                if ( args.textdomain === 'uno' ) {
                    console.log(chalk.green('Done!'));
                    return;
                }
                
                // Get list of copied files.
                themeReplace( 'uno', args.textdomain );

            })
            .then(function() {
                console.log(chalk.green('Done!'));
            })
            .catch(function(e) {

            });
    }

}