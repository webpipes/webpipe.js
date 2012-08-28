#!/usr/bin/env node

var webpipe = require('../index');
var _ = require('underscore');
var options = { 
	'name': {
	    alias : 'n',
	    describe : 'The name of the webpipe.',
		demand : true
	},
	'manual': {
	    alias : 'm',
	    describe : 'Flag. View the full webpipe details (webpipe.json).',
		boolean : true
	},
	'request': {
	    alias : 'r',
	    describe : 'Flag. Make a request and pass along any other args as webpipe input.',
		boolean : true
	}
};
var program = require('optimist')
	.usage('Make webpipe requests.\nUsage: $0')
	.options(options);
var argv = program.argv;

var responseCallback = function(er, data) {
	if (er) {
		console.error("ERROR!\n" + er);
	} else {
		console.log(data);
	}
}

// Create object without optimist argv, options.key, and options.key.alias
var programArguments = ['_', '$0'];

// Remove options.key
programArguments = _.union(programArguments, _.keys(options));

// Finally, remove options.key.alias
programArguments = _.union(programArguments, _.pluck(_.values(options), 'alias'));

// Create object of all non-option arguments.
var nonProgramArguments = _.reject(_.keys(argv), function(arg){ return _.include(programArguments, arg) });

// Combine pipeArguments keys with argv values
var pipeArguments = {};
_.each(nonProgramArguments, function(arg) {
	pipeArguments[arg] = argv[arg];
});

if (argv.manual) {
	webpipe.manual(argv.name, responseCallback);
} else if (argv.request) {
	if (_.size(pipeArguments)) {
		webpipe.request(argv.name, pipeArguments, responseCallback);
	} else {
		webpipe.request(argv.name, responseCallback);
	}
} else {
	program.showHelp();
}
