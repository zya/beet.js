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
  osc.frequency.value = 880;
  osc.start(time);
  osc.stop(time + 0.15);
}

function off2(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.frequency.value = 220;
  osc.start(time);
  osc.stop(time + 0.15);
}
var sequence = poly.sequence(4, 4);
var sequence2 = poly.sequence(4, 4);
var sequence3 = poly.sequence(4, 4);
var layer = poly.layer(sequence, on, off);
var layer2 = poly.layer(sequence2, off, off);
var layer3 = poly.layer(sequence3, off2, off);
poly.add(layer);
poly.add(layer2);
poly.add(layer3);
poly.start();
sequence.shift();
setTimeout(function () {
  console.log('deleting');
  poly.remove(layer2);
  console.log('pausing');
  poly.pause();
  setTimeout(function () {
    console.log('starting');
    poly.start();
  }, 3000);
}, 3000);