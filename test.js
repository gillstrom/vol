import test from 'ava';
import m from '.';

test('get level', async t => {
	t.is(typeof (await m.get()), 'number');
});

test('set level to 30%', async t => {
	await m.set(0.3);
	t.is(await m.get(), 0.3);
});
