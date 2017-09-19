# vol

> Get and set sound volume


## Install

```
$ npm install vol
```


## Usage

```js
const vol = require('vol');

vol.get().then(level => {
	console.log(level);
	//=> 0.45
});

vol.set(0.65).then(() => {
	console.log('Changed volume to 65%');
});
```


## API

### .get()

Returns `Promise` with the current volume level.

### .set(level)

Set volume level.

#### level

Type: `number`

A number between `0` and `1`.


## Related

* [vol-cli](https://github.com/gillstrom/vol-cli) - CLI for this module


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
