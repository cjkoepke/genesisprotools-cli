const fs    = require('fs');
const paths = require('./paths');

let user = false;

if ( fs.existsSync(`${paths.root_path}/user.json`) ) {
    user = JSON.parse( fs.readFileSync(`${paths.root_path}/user.json`) );
}

module.exports = user;
