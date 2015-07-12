var bjork = require('bjorklund');
var watch = require('watchjs').watch;

function Pattern(pulses, steps) {
  this.pulses = pulses;
  this.steps = steps || pulses;
  this.seq = bjork(this.pulses, this.steps).split('');
  var self = this;

  watch(this, ['pulses', 'steps'], function () {
    self.update(this.pulses, this.steps);
  });

  return this;
}

Pattern.prototype.update = function (pulses, steps) {
  steps = steps || pulses;
  this.seq = bjork(pulses, steps).split('');
  return this;
};

Pattern.prototype.shift = function (offset) {
  var off = offset > this.seq.length ? offset = offset - this.seq.length : offset;
  if (off === this.seq.length) return this;

  var tail = this.seq.splice(this.seq.length - off, off);

  for (var i = 0; i < tail.length; i++) {
    this.seq.unshift(tail[i]);
  }
  return this;
};

module.exports = Pattern;