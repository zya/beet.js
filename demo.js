var dat = require('dat-gui');
var prism = require('prismjs');

var Scene = require('./lib/demo/scene');
var Beet = require('./index');
var context = require('./lib/demo/context');

var beet = new Beet({
  context: context
});

var scene = new Scene('eu', {
  element: document.getElementById('simple'),
  layers: [
    {
      pulses: 4,
      slots: 5,
      cb: function(time, step) {
        var osc = context.createOscillator();
        osc.connect(context.destination);
        osc.frequency.value = 220;
        osc.start(time);
        osc.stop(time + 0.2);
      }
    }
    // {
    //   pulses: 7,
    //   slots: 7,
    //   cb: function(time, step) {
    //     var osc = context.createOscillator();
    //     osc.connect(context.destination);
    //     osc.frequency.value = 440;
    //     osc.start(time);
    //     osc.stop(time + 0.2);
    //   }
    // }
  ]
});



scene.start();

function animate() {
  requestAnimationFrame(animate);
  scene.render();
}

animate();
