var context = new AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.2;

var Beet = require('./lib/beet');
var beet = new Beet({
  context: context,
  tempo: 90
});

var pattern = beet.pattern(3, 4);
var layer = beet.layer(pattern, callback);
beet.add(layer);
beet.start();

function callback(time, step) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.start(time);
  osc.stop(time + 0.1);
}