var core = require('./core');
var starter = require('./starter');

module.exports = () => {
    core()
        .then(function(res) {
            starter();
        })
        .catch(function() {
            console.log('\nAborted');
        })
}