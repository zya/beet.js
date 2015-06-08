var bjork = require('bjorklund');
var watch = require('watchjs').watch;

function Sequence(pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
  this.pulses = pulses;
  this.steps = steps;
  var self = this;

  watch(this, 'pulses', function () {
    self.update(this.pulses, this.steps);
  });

  watch(this, 'steps', function () {
    self.update(this.pulses, this.steps);
  });
  return this;
}

Sequence.prototype.update = function (pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
  return this;
};

Sequence.prototype.shift = function (offset) {
  var off = offset > this.seq.length ? offset = offset - this.seq.length : offset;
  if (off === this.seq.length) return this;

  var tail = this.seq.splice(this.seq.length - off, off);

  for (var i = 0; i < tail.length; i++) {
    this.seq.unshift(tail[i]);
  }
  return this;
};

module.exports = Sequence;