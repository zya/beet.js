var Clock = require('waaclock');
var bjork = require('./bjorklund');

function Poly(opts) {
  this.context = opts.context || new AudioContext();
  this.speed = opts.speed || 2;
  this.clock = new Clock(this.context);
}

Poly.prototype.add = function(pulses, length, on, off) {
  var sequence = bjork(pulses, length).split('');
  this.clock.callbackAtTime(function () {
    var steptime = 2 / length;
    sequence.forEach(function (step, index) {
      if (step === '1') {
        on(steptime * index);
      } else if (step === '0') {
        off(steptime * index);
      }
    });
  }, 0.01).repeat(this.speed);
};

Poly.prototype.start = function (time) {
  this.clock.start();
};

module.exports = Poly;