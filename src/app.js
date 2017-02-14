/**
 * Dependency conventions:
 *
 * - External modules are loaded from 'lib'.
 * - Internal modules are loaded from 'src'.
 */
requirejs.config({
    baseUrl: '',

    paths: {
        domReady: 'lib/domReady/domReady',
        font: 'lib-local/font',
        propertyParser: 'lib/requirejs-plugins/src/propertyParser'
    },

    packages: [
        {
            name: 'game',
            location: 'src/game',
            main: 'main'
        },
        {
            name: 'engine',
            location: 'src/engine',
            main: 'main'
        }
    ]
});

/**
 * Load the entry point.
 */
requirejs(['src/main']);