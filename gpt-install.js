var program = require('commander');

program
    .action(function(test) {
        console.log(test);
    });