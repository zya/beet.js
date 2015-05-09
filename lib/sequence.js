var bjork = require('bjorklund');

function Sequence(pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
  return this;
}

Sequence.prototype.update = function (pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
};

Sequence.prototype.shift = function (offset) {
  var off = offset > this.seq.length ? offset = offset - this.seq.length : offset;
  var t = this.seq.splice(0, off);
  for (var i = 0; i < t.length; i++) {
    this.seq.push(t[i]);
  }
};

module.exports = Sequence;