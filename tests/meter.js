var test = require('tap').test;
var Meter = require('..');

test('emits 0 when no activity', function(t) {
  t.plan(10);
  var m = Meter(100);
  var count = 0;

  m.on('frequency', function(f) {
    console.log('f:', f);
    count ++;
    t.strictEqual(f, 0);
    if (count == 10) {
      console.log('endindind');
      m.end();
    }
  });
});