#!/usr/bin/env node
var program   = require('commander');
var fs        = require('fs');
var prompt    = require('promptly');

program
    .version('0.1.0')
    .arguments('<cmd>')
    .command('core',    'Setup GPT core dependencies via Composer.', {isDefault: true})
    .command('starter', 'Setup GPT starter theme files.')
    .parse(process.argv);