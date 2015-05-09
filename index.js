var context = new AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.2;


var Poly = require('./lib/poly');
var poly = new Poly({
  context: context,
  tempo: 90
});

function on(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.start(time);
  osc.stop(time + 0.1);
}

function off(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.frequency.value = 220;
  osc.start(time);
  osc.stop(time + 0.15);
}
var sequence = poly.sequence(1, 4);
var layer = poly.layer(sequence, on, off);
poly.add(layer);
poly.start();

setTimeout(function () {
  sequence.update(1, 5);
}, 3000);

// var Metro = require('wa-metro');
// var metro = new Metro(context, on);
// metro.start();