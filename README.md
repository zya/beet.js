# beet.js
Polyrhythmic Sequencer library for Web Audio API.



### Example Usage
````js
var context = new AudioContext();

// initialize beet
var beet = new Beet({
  context: context,
  tempo: 100
});

// create a euclidean pattern - 5 pulses distrubted in 7 steps
var pattern = beet.pattern(5,7);

// create a beet layer - pass it the pattern and a callback
var layer = beet.layer(pattern, callback);

function callback(time){
  var osc = context.createOscillator();
  osc.connect(context.destination);
  osc.start(time);
  osc.stop(time + 0.1);
}

// add the layer
beet.add(layer);

// start the sequencer
beet.start();
````
## API

### Beet
### `beet.start(time)`

Starts the sequencer after a given time in seconds.

#### Parameters
* time - a number in seconds - defaults to 0

### `beet.stop(time)`

Stops the sequencer after a given time in seconds.

#### Parameters
* time (optional) - a number in seconds - defaults to 0

### Pattern
### `beet.pattern(pulses, steps)`
Returns a `pattern` object containing a [bjorklund](https://github.com/zya/bjorklund) sequence with equally distributed number of `pulses` over `steps`.

#### Parameters
* pulses (required) - number of pulses (active steps) in the sequence
* steps (required) - number of steps in the sequence

#### example
````js
var pattern = beet.pattern(3, 7);
// a pattern object containing a sequence as below
// '1010100'
````

### `.update(pulses, steps)`
Updates the pattern object with the new values. You can also update the values directly. See example below.

#### example
````js
var pattern = beet.pattern(2, 5);
pattern.update(5,8); // updates the pattern to '10100'

// you can also set the values separately
pattern.pulses = 4;
pattern.steps = 8;
````