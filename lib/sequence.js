var bjork = require('bjorklund');

function Sequence(pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
  return this;
}

Sequence.prototype.update = function (pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
};

Sequence.prototype.shift = function (value) {
  var val = value > this.seq.length ? value = value - this.seq.length : value;
  var t = this.seq.splice(0, val);
  for (var i = 0; i < t.length; i++) {
    this.seq.push(t[i]);
  }
};

module.exports = Sequence;