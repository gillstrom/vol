#!/usr/bin/env node
'use strict';
var progressControl = require('progress-control');
var indentString = require('indent-string');
var cliCursor = require('cli-cursor');
var toPercent = require('to-percent');
var firstRun = require('first-run');
var chalk = require('chalk');
var meow = require('meow');
var vol = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ vol (Interactive CLI)',
		'  $ vol <level>',
		'  $ vol mute'
	]
});

if (!cli.input.length) {
	vol.get(function (err, level) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		if (!process.stdin.isTTY) {
			console.log(level);
			return;
		}

		var text = '[:bar] :level';
		var bar = progressControl(text, {total: 10}, {
			up: function () {
				level = Math.min(Math.round((level + 0.1) * 10) / 10, 1);
				updateBar(level);
			},
			down: function () {
				level = Math.max(Math.round((level - 0.1) * 10) / 10, 0);
				updateBar(level);
			}
		});

		function updateBar(level) {
			vol.set(level, function (err) {
				if (err) {
					console.error(err.message);
					process.exit(1);
				}
			});

			var str = toPercent(level) + '%';
			var maxLength = 4;
			bar.update(level, {level: indentString(str, ' ', maxLength - str.length)});
		}

		cliCursor.hide();

		if (firstRun()) {
			text += '   ' + chalk.dim('Use up/down arrows');
		}

		updateBar(level);
	});

	return;
}

vol.set(cli.input[0] === 'mute' ? 0 : cli.input[0], function (err) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
});
