'use strict';
var execFile = require('child_process').execFile;
var path = require('path');
var inRange = require('in-range');
var toDecimal = require('to-decimal');
var toPercent = require('to-percent');

if (process.platform === 'darwin') {
	module.exports = require('osx-vol');
} else if (process.platform === 'linux') {
	module.exports = require('linux-vol');
} else {
	module.exports.get = function (cb) {
		execFile(path.join(__dirname, 'vendor/volume.exe'), function (err, stdout) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, toDecimal(parseInt(stdout, 10)));
		});
	};

	module.exports.set = function (level, cb) {
		if (typeof level !== 'number') {
			throw new TypeError('Expected a number');
		}

		if (!inRange(level, 1)) {
			cb(new Error('Expected a level between 0 and 1'));
			return;
		}

		execFile(path.join(__dirname, 'vendor/volume.exe'), [toPercent(level)], function (err) {
			if (err) {
				cb(err);
				return;
			}

			cb();
		});
	};
}
