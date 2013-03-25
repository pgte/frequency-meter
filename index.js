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

  // happened
  ee.happened =
  ee.activity =
  function happened() {
    count ++;
    if (count == maxCount) cycle();
  };

  /// end
  ee.end =
  function end() {
    unschedule();
    
    ee.happened = 
    ee.activity =
    function() {
      throw new Error('ended');
    }
  };

  schedule();

  return ee;

  //// ------

  function cycle() {
    var t = now();
    period = (t - start) / 1000;
    frequency = count / period;

    // adjust maxCount
    maxCount = Math.round(frequency * targetInterval);

    frequency = frequency * 1000;

    unschedule();
    schedule();
    
    ee.emit('frequency', frequency);
 
    count = 0;
    start = t;
  }

  function schedule() {
    timeout = setTimeout(function() {
      if (count == 0) {
        schedule();
        ee.emit('frequency', frequency = 0);
      } else {
        maxCount = count + 1;
      }
    }, period);
  }

  function unschedule() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  }

}