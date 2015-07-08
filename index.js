'use strict';

if(process.platform === 'darwin'){
    module.exports = require('osx-vol');
}
else if(process.platform === 'linux'){
    module.exports = require('linux-vol');
}
else{
    throw Error('Your os is not currently supported');
}
