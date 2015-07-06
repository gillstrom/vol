#!/usr/bin/env node
'use strict';
var meow = require('meow');
var toPercent = require('to-percent');
var vol = require('./');

var cli = meow({
	help: [
		'Example',
		'  $ vol',
		'  $ vol 0.4',
		'  $ vol mute'
	]
});

if (!cli.input.length) {
	vol.get(function (err, level) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		console.log(toPercent(level) + '%');
	});
} else {
	var level = cli.input[0] === 'mute' ? 0 : cli.input[0];

	vol.set(level, function (err) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}
	});
}

