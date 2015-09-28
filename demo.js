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

var scene2 = new Scene('eu', {
  element: document.getElementById('simple2'),
  layers: [
    {
      pulses: 9,
      slots: 13,
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

var scene3 = new Scene('eu', {
  element: document.getElementById('simple3'),
  layers: [
    {
      pulses: 4,
      slots: 4,
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
    },
    {
      pulses: 5,
      slots: 5,
      cb: function(time, step) {
        var osc = context.createOscillator();
        var gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        beet.utils.envelope(gain.gain, time, {
          attack: 0.1,
          release: 0.2
        });
        osc.frequency.value = beet.utils.ntof('f3');
        osc.start(time);
        osc.stop(time + 0.4);
      }
    }
  ]
});

var scene4 = new Scene('eu', {
  element: document.getElementById('simple4'),
  layers: [
    {
      pulses: 4,
      slots: 4,
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
    },
    {
      pulses: 5,
      slots: 5,
      cb: function(time, step) {
        var osc = context.createOscillator();
        var gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        beet.utils.envelope(gain.gain, time, {
          attack: 0.1,
          release: 0.2
        });
        osc.frequency.value = beet.utils.ntof('f3');
        osc.start(time);
        osc.stop(time + 0.4);
      }
    },
    {
      pulses: 2,
      slots: 4,
      cb: function(time, step) {
        var osc = context.createOscillator();
        var gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        beet.utils.envelope(gain.gain, time, {
          attack: 0.1,
          release: 0.2
        });
        osc.frequency.value = beet.utils.ntof('a0');
        osc.start(time);
        osc.stop(time + 0.4);
      }
    }
  ]
});

function animate() {
  requestAnimationFrame(animate);
  scene.render();
  scene2.render();
  scene3.render();
  scene4.render();
}

animate();
