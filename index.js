var context = new AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.5;

var Poly = require('./lib/poly');
var poly = new Poly({
  context: context,
  speed: 2
});

function on(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.start(context.currentTime + time);
  osc.stop(context.currentTime + time + 0.2);
}

function off(time) {
  var osc = context.createOscillator();
  osc.connect(gain);
  osc.frequency.value = 220;
  osc.start(context.currentTime + time);
  osc.stop(context.currentTime + time + 0.2);
}

poly.start();
poly.add(5, 9, on, off);

