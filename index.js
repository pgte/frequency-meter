var EventEmitter = require('events').EventEmitter;
var now = require('microtime').now;

module.exports =
function FrequencyMeter(targetInterval) {
  if (! targetInterval) targetInterval = 1000;

  var count = 0;
  var maxCount = 10;
  var start = now();
  var frequency = 0;
  var period = targetInterval;
  var timeout;

  var ee = new EventEmitter();

  ee.happened =
  function happened() {
    count ++;
    if (count == maxCount) cycle();
  };

  ee.end =
  function end() {
    clearTimeout(timeout);
  };

  schedule();

  return ee;

  //// ------

  function cycle(fromTimeout) {
    clearTimeout(timeout);
    var t = now();
    period = (t - start) / 1000;
    if (fromTimeout) period = period / 2;

    if (count === 0) {
      frequency = 0;
      period = targetInterval / 2;
    } else {
      frequency = (period / 1000) / count;
    }

    schedule();
    
    ee.emit('frequency', frequency);
 
    count = 0;
    start = t;
  }

  function schedule() {
    timeout = setTimeout(cycle, period * 2, true);
  }

}