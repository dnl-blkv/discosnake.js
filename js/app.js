// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
	baseUrl: 'js/lib',

	paths: {
		app: '../app'
	},

	packages: [
		{
			name: 'game',
			location: '../app/game'
		},
		{
			name: 'engine',
			location: '../app/engine'
		},
		{
			name: 'engine/graphics',
			location: '../app/engine/graphics'
		}
	]
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);