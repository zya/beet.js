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

var sequence = poly.sequence(4, 4);
// var sequence2 = poly.sequence(2, 5);

var layer = poly.layer(sequence, on);
// var layer2 = poly.layer(sequence2, off);
poly.add(layer);
// poly.add(layer2);
poly.start();

window.poly = poly;
window.sequence = sequence;

// setTimeout(function () {
//   poly.tempo = 180;
// }, 1000);

// setTimeout(function () {
//   console.log('test');
//   sequence.shift(1);
//   setTimeout(function () {
//     console.log('test2');
//     sequence.shift(1);
//   }, 1000);
// }, 3000);