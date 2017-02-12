/**
 * Dependency conventions:
 *
 * - External modules are loaded from "./lib".
 * - Internal modules are loaded from "./src".
 */
requirejs.config({
    baseUrl: './',

    paths: {
        domReady: './lib/domReady',
        font: './lib/font',
        propertyParser: './lib/propertyParser'
    },

    packages: [
        {
            name: 'game',
            location: './src/game',
            main: 'Game'
        },
        {
            name: 'engine',
            location: './src/engine',
            main: 'main'
        }
    ]
});

/**
 * Load the entry point.
 */
requirejs(['./src/main']);