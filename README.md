# Frequency Meter

Measures the frequency of events.


## Install

```bash
$ npm isntall frequency-meter
```


## Use

Require:

```javascript
var FM = require('frequency-meter');
```

Construct:

```javascript
var fm = FM();
```

or construct with target emit interval (defaults to 1 second):

```javascript
var fm = FM(5000); // 5 seconds
```

Feed it events:

```javascript
setInterval(function() {
  fm.happened();
}, 100);
```

And listen for frequency updates:

```javascript
fm.on('frequency', function(freq) {
  console.log('frequency is', freq);
});
```

End it:

```javascript
fm.end();
```

## License

MIT