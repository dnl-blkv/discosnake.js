// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
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

// Start loading the main app file. Put all of
// your application logic in there.
// Don't forget to load all the module configurations
requirejs(['./src/main']);