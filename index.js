'use strict';

if (process.platform === 'darwin') {
	module.exports = require('./lib/osx');
} else if (process.platform === 'linux') {
	module.exports = require('./lib/linux');
} else {
	module.exports = require('./lib/win');
}
