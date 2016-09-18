'use strict';
const path = require('path');
const execa = require('execa');
const inRange = require('in-range');
const toDecimal = require('to-decimal');
const toPercent = require('to-percent');

exports.get = () => execa.stdout(path.join(__dirname, '../vendor/volume.exe')).then(stdout => toDecimal(parseInt(stdout, 10)));

exports.set = level => {
	if (typeof level !== 'number') {
		return Promise.reject(new TypeError('Expected a number'));
	}

	if (!inRange(level, 1)) {
		return Promise.reject(new Error('Expected a level between 0 and 1'));
	}

	return execa(path.join(__dirname, '../vendor/volume.exe'), [toPercent(level)]);
};
