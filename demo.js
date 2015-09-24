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
      pulses: 5,
      slots: 9,
      cb: function(time, step) {
        var osc = context.createOscillator();
        var gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        beet.utils.envelope(gain.gain, time, {
          attack: 0.1,
          release: 0.2
        });
        osc.frequency.value = beet.utils.ntof('c3');
        osc.start(time);
        osc.stop(time + 0.4);
      }
    }
  ]
});

scene.start();

function animate() {
  requestAnimationFrame(animate);
  scene.render();
}

animate();
