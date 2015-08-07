# vol [![Build Status](https://travis-ci.org/gillstrom/vol.svg?branch=master)](https://travis-ci.org/gillstrom/vol)

> Get and set sound volume.


## Install

```
$ npm install --save vol
```


## Usage

```js
var vol = require('vol');

vol.get(function (err, level) {
	console.log(level);
	//=> 0.45
});

vol.set(0.65, function (err) {
	console.log('Changed volume to 65%');
});

vol.mute(function (err) {
	console.log('Volume muted');
});
```


## CLI

<img width="283" src="screenshot.png">

```
$ npm install --global vol
```

```
$ vol --help

  Usage
    $ vol (Interactive CLI)
    $ vol <level>
    $ vol mute
```


## API

### .get(callback)

Get volume level.

#### callback(err, level)
  
Type: `function`

##### level

Type: `number`

Current volume level.

### .set(level, callback)

Set volume level.

#### level

*Required*
Type: `number`

A number between `0` and `1`.

#### callback(err)
  
Type: `function`

Returns nothing but a possible exception.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
