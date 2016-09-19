'use strict';
const inRange = require('in-range');
const runApplescript = require('run-applescript');
const toDecimal = require('to-decimal');
const toPercent = require('to-percent');

exports.get = () => runApplescript('get volume settings').then(res => toDecimal(parseInt(res.split(':')[1], 10)));

exports.set = level => {
	if (typeof level !== 'number') {
		return Promise.reject(new TypeError('Expected a number'));
	}

	if (!inRange(level, 1)) {
		return Promise.reject(new Error('Expected a level between 0 and 1'));
	}

	return runApplescript(`set volume output volume ${toPercent(level)}`);
};
