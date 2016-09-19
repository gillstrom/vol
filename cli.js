#!/usr/bin/env node
'use strict';
const progressControl = require('progress-control');
const indentString = require('indent-string');
const cliCursor = require('cli-cursor');
const toPercent = require('to-percent');
const firstRun = require('first-run');
const chalk = require('chalk');
const meow = require('meow');
const vol = require('./');

const cli = meow(`
	Usage
	  $ vol (Interactive CLI)'
	  $ vol <level>'
	  $ vol mute
`);

if (cli.input.length === 0) {
	return vol.get().then(level => {
		if (!process.stdin.isTTY) {
			console.log(level);
			return;
		}

		let text = '[:bar] :level';

		const updateBar = (level, bar) => {
			vol.set(level);

			const str = toPercent(level) + '%';
			const maxLength = 4;

			bar.update(level, {level: indentString(str, maxLength - str.length)});
		};

		const bar = progressControl(text, {total: 10}, {
			up: () => {
				level = Math.min(Math.round((level + 0.1) * 10) / 10, 1);
				updateBar(level, bar);
			},
			down: () => {
				level = Math.max(Math.round((level - 0.1) * 10) / 10, 0);
				updateBar(level, bar);
			}
		});

		cliCursor.hide();

		if (firstRun()) {
			text += `    ${chalk.dim('Use up/down arrows')}`;
		}

		updateBar(level, bar);
	});
}

vol.set(cli.input[0] === 'mute' ? 0 : cli.input[0]);
