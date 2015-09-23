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

// var scene2 = new Scene('eu', beet, {
//   slots: 3,
//   pulses: 3,
//   freq: 220
// });

var scene3 = new Scene('eu', beet, {
  slots: 5,
  pulses: 5,
  freq: 220
});

// setTimeout(function() {
//   scene.change({
//     slots: 4,
//     pulses: 4
//   });
//   setTimeout(function() {
//     scene.change({
//       slots: 19,
//       pulses: 7
//     });
//   }, 3000);
// }, 3000);

beet.start();

function animate() {
  requestAnimationFrame(animate);
  // scene2.render();
  scene.render();
  scene3.render();
}

animate();
