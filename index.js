#!/usr/bin/env node
var program   = require('commander');
var fs        = require('fs');
var prompt    = require('promptly');

program
    .version('0.1.0')
    .arguments('<cmd>')
    .command('core',    'Setup GPT core dependencies via Composer.')
    .command('starter', 'Setup GPT starter theme files.')
    .command('setup',   'Setup both GPT core dependencies and starter theme files.', {isDefault: true})
    .parse(process.argv);