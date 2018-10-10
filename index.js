#!/usr/bin/env node
var PROGRAM = require('commander');
var SHELL   = require('shelljs');
var FS      = require('fs');

// Genesis Pro Tools path object.
var GPT_VENDOR_PATH = `${process.cwd()}/vendor/gpt/core`

PROGRAM
    .version('0.1.0')
    .arguments('<cmd>')
    .action(function(cmd) {
        
        switch( cmd ) {
            case 'init':
                console.log( GPT_VENDOR_PATH )
                if ( ! FS.existsSync(GPT_VENDOR_PATH) ) {
                    console.error('You must have the Genesis Pro Tools package installed in the default /vendor folder before this action can be performed.');
                    return;
                }
                SHELL.exec( `sudo ${GPT_VENDOR_PATH}/scripts/shell/functions.sh` );
                break;
            default:
                console.log('Sorry, that command is not valid.');
        }

    })
    .parse(process.argv)