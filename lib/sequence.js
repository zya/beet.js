var bjork = require('bjorklund');

function Sequence(pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
  return this;
}

Sequence.prototype.update = function (pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
};

module.exports = Sequence;