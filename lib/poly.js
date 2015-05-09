var Metro = require('wa-metro');
var bjork = require('bjorklund');

function Layer(context, tempo, sequence, on, off) {
  var self = this;
  this.on = on;
  this.off = off;
  this.sequence = sequence.seq;
  this.id = Math.random() * 10000;
  this.metro = new Metro(context, function (time, step) {
    if (self.sequence[step - 1] === '1') {
      self.on(time, step);
    } else {
      self.off(time, step);
    }
  });
  this.metro.steps = this.sequence.length;
  this.metro.tempo = tempo;
}

Layer.prototype.start = function () {
  this.metro.start();
};

Layer.prototype.pause = function () {
  this.metro.pause();
};

Layer.prototype.stop = function () {
  this.metro.stop();
};

Layer.prototype.change = function (sequence) {
  this.sequence = sequence.seq;
  this.metro.steps = sequence.seq.length;
};

function Sequence(pulses, steps) {
  this.seq = bjork(pulses, steps).split('');
  return this;
}

function Poly(opts) {
  this.context = opts.context;
  this.tempo = opts.tempo || 120;
  this.layers = [];
}

Poly.prototype.layer = function (seq, on, off) {
  var layer = new Layer(this.context, this.tempo, seq, on, off);
  return layer;
};

Poly.prototype.sequence = function (pulses, steps) {
  return new Sequence(pulses, steps);
};

Poly.prototype.add = function (layer) {
  this.layers.push(layer);
};

Poly.prototype.start = function () {
  this.layers.forEach(function (layer) {
    layer.start();
  });
};

module.exports = Poly;