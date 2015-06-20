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

// start the sequencer
beet.start();
````

