const shell = require('shelljs');

/**
 * Helper function to find and replace a string within the Uno theme.
 * 
 * @since 1.0.0
 */
const themeReplace = (find, replace) => {
    shell.ls([
        '*.php',
        'src/**/*.php',
        'package.json'
    ])
        .forEach(function(file) {
            shell.sed('-i', new RegExp(`${find}_`),  `${replace}_`,  file);
            shell.sed('-i', new RegExp(`${find}-`),  `${replace}-`,  file);
            shell.sed('-i', new RegExp(`'${find}'`), `'${replace}'`, file);

            if ( file === 'package.json' ) {
                shell.sed('-i', new RegExp(`"${find}"`), `"${replace}"`, file);
            }
        });
}

module.exports = themeReplace