var context = new AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.2;


var Poly = require('./lib/poly');
var poly = new Poly({
  context: context,
  tempo: 90
});

function off(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.start(time);
  osc.stop(time + 0.1);
}

function on(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.frequency.value = 880;
  osc.start(time);
  osc.stop(time + 0.15);
}

var sequence = poly.sequence(1, 4);
var layer = poly.layer(sequence, on, off);
poly.add(layer);
poly.start();

setTimeout(function () {
  sequence.shift(1);
  // setTimeout(function () {
  //   sequence.shift(5);
  // }, 1000);
}, 3000);
