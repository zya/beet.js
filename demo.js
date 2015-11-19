var dat = require('dat-gui');
var prism = require('prismjs');

var Scene = require('./lib/demo/scene');
var Beet = require('./index');
var Sound = require('./lib/demo/sound');
var context = require('./lib/demo/context');
var gain = context.createGain();
gain.gain.value = 0.4;
gain.connect(context.destination);

var beet = new Beet({
  context: context
});

var scene1 = new Scene('Euclidean 5/9', {
  element: document.getElementById('59'),
  layers: [
    {
      pulses: 5,
      slots: 9,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });

        sound.start(time, step, {
          notes: ['g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4', 'g4'],
          a: 0.01,
          d: 0.01,
          s: 0.3,
          r: 0.3
        });
      }
    }
  ]
});

var scene2 = new Scene('Euclidean 9/13', {
  element: document.getElementById('913'),
  layers: [
    {
      pulses: 9,
      slots: 13,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        //1011011011011
        sound.start(time, step, {
          notes: ['e4', '_', 'g#4', 'b4', '_', 'g#4', 'b4', '_', 'g#4', 'b4', '_', 'g#4', 'b4'],
          a: 0.04,
          d: 0.01,
          s: 0.3,
          r: 0.25
        });
      }
    }
  ]
});

var scene3 = new Scene('Poly 5 4', {
  element: document.getElementById('poly1'),
  layers: [
    {
      pulses: 4,
      slots: 4,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          notes: ['e4', 'd#4', 'g#4', 'b4'],
          a: 0.04,
          d: 0.01,
          s: 0.3,
          r: 0.5
        });
      }
    },
    {
      pulses: 5,
      slots: 5,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          notes: ['e3', 'd#3', 'g#3', 'b3', 'g#3'],
          a: 0.04,
          d: 0.01,
          s: 0.3,
          r: 0.6
        });
      }
    }
  ]
});

var scene4 = new Scene('Multiple Layers', {
  element: document.getElementById('layered'),
  layers: [
    {
      pulses: 4,
      slots: 8,
      tempo: 120,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          //101010100
          notes: ['a1', '_', 'a1', '_', 'a1', '_', 'a1', '_'],
          a: 0.01,
          d: 0.00,
          s: 0.9,
          r: 0.2
        });
      }
    },
    {
      pulses: 3,
      slots: 8,
      tempo: 60,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          //10100100
          notes: ['f4', '_', 'g#4', '_', '_', 'c4'],
          a: 1,
          d: 0.01,
          s: 0.2,
          r: 1
        });
      }
    },
    {
      pulses: 4,
      slots: 4,
      tempo: 120 / 3,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          //101010100
          notes: ['c3', 'd#3', 'g3', 'd#3'],
          a: 0.6,
          d: 0.00,
          s: 0.9,
          r: 1.2
        });
      }
    }
  ]
});


var scene5 = new Scene('On/off', {
  element: document.getElementById('off'),
  layers: [
    {
      pulses: 4,
      slots: 9,
      cb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          //101010100
          notes: ['c4', '_', 'd#4', '_', 'g4', '_', 'd#4'],
          a: 0.04,
          d: 0.01,
          s: 0.3,
          r: 0.6
        });
      },
      offCb: function(time, step) {
        var sound = new Sound({
          context: context,
          beet: beet,
          destination: gain
        });
        sound.start(time, step, {
          //101010100
          notes: ['_', 'f3', '_', 'g#3', '', 'c3', '_', 'f3', 'g#3'],
          a: 0.04,
          d: 0.01,
          s: 0.3,
          r: 0.6
        });
      }
    }
  ]
});

function animate() {
  requestAnimationFrame(animate);
  scene1.render();
  scene2.render();
  scene3.render();
  scene4.render();
  scene5.render();
}

animate();
