var dat = require('dat-gui');

var Scene = require('./lib/demo/scene');
var Beet = require('./index');
var context = new AudioContext();

var beet = new Beet({
  context: context
});
var scene = new Scene('eu', beet, {
  slots: 4,
  pulses: 4,
  freq: 440
});

var scene2 = new Scene('eu', beet, {
  slots: 5,
  pulses: 5,
  freq: 220
});

beet.start();

function animate() {
  requestAnimationFrame(animate);
  scene.render();
  scene2.render();
}

animate();
