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
#### `beet.start(time)`

Starts the sequencer after a given time in seconds.

#### Parameters
* time - a number in seconds - defaults to 0

#### `beet.stop(time)`

Stops the sequencer after a given time in seconds and resets the current step number.

#### Parameters
* time (optional) - a number in seconds - defaults to 0

#### `beet.pause(time)`

Pauses the sequencer after a given time in seconds but keeps the current step number.

#### Parameters
* time (optional) - a number in seconds - defaults to 0

#### `beet.add(layer)`

Adds a given `beet.layer` to the list of layers to play.

#### Parameters
* layer (Required) - a `beet.layer` object.

#### `beet.remove(layer)`

Removes a given `beet.layer` from the list of layers to play.

#### Parameters
* layer (Required) - a `beet.layer` object.

### Pattern
#### `beet.pattern(pulses, steps)`
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

#### `.update(pulses, steps)`
Updates the pattern object with the new values. You can also update the values directly. See example below.

#### Parameters
* pulses (required) - number of pulses (active steps) in the sequence
* steps (required) - number of steps in the sequence

#### example
````js
var pattern = beet.pattern(2, 5);
pattern.update(5,8); // updates the pattern to '10100'

// you can also set the values separately
pattern.pulses = 4;
pattern.steps = 8;
````

#### `.shift(offset)`
Shifts the sequence by the offset and returns the pattern object.

#### Parameters
* offset (required) - number of steps to shift the sequence by

#### example
````js
var pattern = beet.pattern(1, 4); // returns '1000'
pattern.shift(1) // updates the sequence to '0100'
````

### Layer
#### `layer(pattern, onCallback, offCallback)`
Creates a `beet.layer` object and returns it.

#### Parameters
* pattern (required) - a `beet.pattern` object.
* onCallback (required) - a function to call on pattern's pulses e.g. 1's
* offCallback (optional) - a function to call on pattern's empty slots e.g. 0's.

#### example
````js
var pattern = beet.pattern(1, 4); // returns '1000'
var layer = beet.layer(pattern, on, off); 
// on will be called on 1
// off will be called on 0's
````
#### Callback format
The callbacks are functions that will be called from the scheduler.
The functions will be called with a `time` and a `step` parameter.
You can use the `time` parameter for web audio methods. `step` can be used to change audio behaviour according to the current step.

#### example
````
function callback (time, step) {
    var osc = context.createOscillator();
    osc.connect(context.destination);
    if(step === 1){
      osc.frequency.value = 880;
    }
    osc.start(time);
    osc.stop(time + 0.2);
}
```` 