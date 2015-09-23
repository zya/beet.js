var dat = require('dat-gui');

var Scene = require('./lib/demo/scene');
var Beet = require('./index');
var context = new AudioContext();

var beet = new Beet({
  context: context
});
var scene = new Scene('eu', beet, {
  slots: 9,
  pulses: 2
});

setTimeout(function() {
  scene.change({
    slots: 4,
    pulses: 4
  });
  setTimeout(function() {
    scene.change({
      slots: 19,
      pulses: 7
    });
  }, 1000);
}, 1000);

function animate() {
  requestAnimationFrame(animate);
  scene.render();
}

animate();
