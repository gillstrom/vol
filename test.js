'use strict';
var test = require('ava');
var vol = require('./');

if (!process.env.CI) {
	test('get level', function (t) {
		t.plan(2);

		vol.get(function (err, level) {
			t.assert(!err, err);
			t.assert(typeof level === 'number');
		});
	});

	test('set level to 50%', function (t) {
		t.plan(3);

		vol.set(0.3, function (err) {
			t.assert(!err, err);

			vol.get(function (err, level) {
				t.assert(!err, err);
				t.assert(level === 0.3);
			});
		});
	});
}
