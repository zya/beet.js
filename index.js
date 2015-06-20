var context = new AudioContext();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.2;

var beet = require('./lib/beet');
var beet = new beet({
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

var pattern = beet.pattern(3, 4);
// var pattern2 = beet.pattern(2, 5);

var layer = beet.layer(pattern, on);
// var layer2 = beet.layer(pattern2, off);
beet.add(layer);
// beet.add(layer2);
beet.start();

window.beet = beet;
window.pattern = pattern;


setTimeout(function () {
  pattern.shift(1);
  setTimeout(function () {
    pattern.shift(1);
  }, 1000);
}, 3000);