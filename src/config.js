const inquirer = require('inquirer');
const shell    = require('shelljs');
const chalk    = require('chalk');
const paths    = require('../paths');
const fs       = require('fs');

module.exports = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Username:',
            name: 'username',
        },
        {
            type: 'input',
            message: 'Your unique access token for Genesis Pro Tools []:',
            default: '',
            name: 'token'
        }
    ])
    .then(function(args) {

        // Store user information for retrieval.
        shell
            .exec(`composer config --global --auth http-basic.genesis-pro-tools.repo.packagist.com token ${args.token}`)
            .cat(`${paths.root_path}/templates/user.json`)
            .sed(/\${USERNAME}/, args.username.toString())
            .sed(/\${TOKEN}/, args.token.toString())
            .to(`${paths.root_path}/user.json`);

    })
    .then(function() {
        if ( fs.existsSync(`${paths.root_path}/user.json`) ) {
            console.log(chalk.green.bold('Authenticated!'));
        } else {
            console.log(chalk.red('Authentication failed!'));
        }
    })
    .catch(function(e) {console.log(e)});
}