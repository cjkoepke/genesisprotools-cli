const inquirer = require('inquirer');
const shell    = require('shelljs');
const paths    = require('../paths');

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
    ]).then(function(args) {
        shell
            .sed('-i', /\${USERNAME}/gm, args.username.toString(), `${paths.root_path}/credentials.json`)
            .sed('-i', /\${TOKEN}/gm, args.token.toString(), `${paths.root_path}/credentials.json`)
            .exec(`composer config --global --auth http-basic.genesis-pro-tools.repo.packagist.com token ${args.token}`);
    })
}