var Metro = require('wa-metro');

function Layer(context, tempo, sequence, on, off) {
  var self = this;
  this.on = on;
  this.off = off;
  this.metro = new Metro(context, function (time, step) {
    console.log(sequence.seq);
    if (self.metro.steps !== sequence.seq.length) {
      self.metro.steps = sequence.seq.length;
    }
    if (sequence.seq[step - 1] === '1') {
      self.on(time, step);
    } else {
      self.off(time, step);
    }
  });
  this.metro.steps = sequence.seq.length;
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

module.exports = Layer;
