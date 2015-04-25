var context = new AudioContext();
var Clock = require('waaclock');
var clock = new Clock(context);
clock.start();

var gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.5;

clock.setTimeout(function (event) {
    var time = 2 / 4;
    for (var i = 0; i < 4; i++) {
      var osc = context.createOscillator();
      osc.frequency.value = 880;
      osc.connect(gain);
      osc.start(context.currentTime + (time * i));
      osc.stop(context.currentTime + (time * i) + 0.2);
    }

    var time2 = 2 / 3;
    for (var j = 0; j < 3; j++) {
      var osc2 = context.createOscillator();
      osc2.frequency.value = 220;
      osc2.connect(gain);
      osc2.start(context.currentTime + (time2 * j));
      osc2.stop(context.currentTime + (time2 * j) + 0.2);
    }

  }, 2)
  .repeat(2)
  .tolerance({
    early: 0.1
  });