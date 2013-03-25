var test = require('tap').test;
var Meter = require('..');

test('emits 0 when no activity', function(t) {
  t.plan(10);
  var m = Meter(100);
  var count = 0;

  m.on('frequency', function(f) {
    count ++;
    t.strictEqual(f, 0);
    if (count == 10) {
      m.end();
    }
  });
});

test('emits when constant activity', function(t) {
  t.plan(10);
  var m = Meter(100);
  var count = 0;

  var interval = setInterval(function() {
    m.activity();
  }, 10);

  m.on('frequency', function(f) {
    count ++;
    if (count == 10) {
      clearInterval(interval);
      m.end();
    }
    t.ok(f <= 105 && f >= 85, 'frequency inside expected interval:' + f);
  });
});