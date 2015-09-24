var dat = require('dat-gui');

var Scene = require('./lib/demo/scene');
var Beet = require('./index');
var context = require('./lib/demo/context');

var beet = new Beet({
  context: context
});

var scene = new Scene('eu', beet, {
  layers: [
    {
      slots: 4,
      pulses: 3,
      cb: function(time, step) {

      }
    },
    {
      slots: 5,
      pulses: 3,
      cb: function(time, step) {

      }
    }
  ]
});

var scene2 = new Scene('eu', beet, {
  layers: [
    {
      slots: 4,
      pulses: 4,
      cb: function(time, step) {

      }
    }
  ]
});

beet.start();

function animate() {
  requestAnimationFrame(animate);
  scene.render();
  scene2.render();
}

animate();
