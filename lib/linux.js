'use strict';
const execa = require('execa');
const inRange = require('in-range');
const toPercent = require('to-percent');
const toDecimal = require('to-decimal');

exports.get = () => {
	return execa.stdout('pactl', ['list', 'sinks']).then(stdout => {
		const matches = stdout.match(/Volume: 0:\s*(\d+)%/);

		if (!matches) {
			throw new Error('Could not get the volume');
		}

		return toDecimal(parseInt(matches[1], 10));
	});
};

exports.set = level => {
	if (typeof level !== 'number') {
		return Promise.reject(new TypeError('Expected a number'));
	}

	if (!inRange(level, 1)) {
		return Promise.reject(new Error('Expected a level between 0 and 1'));
	}

	return execa('pactl', ['set-sink-volume', 0, `${toPercent(level)}%`]);
};
