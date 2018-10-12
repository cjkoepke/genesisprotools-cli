var core = require('./core');
var uno  = require('./uno');

module.exports = () => {
    core()
        .then(function(res) {
            uno();
        })
        .catch(function() {
            console.log('\nAborted');
        })
}