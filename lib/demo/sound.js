function Sound(options) {
  this.context = options.context;
  this.beet = options.beet;
  this.destination = options.destination;
}

Sound.prototype.start = function (time, step, options) {
  var self = this;
  var osc = self.context.createOscillator();
  var gain = self.context.createGain();

  osc.connect(gain);
  gain.connect(self.destination);
  var note = self.beet.utils.ntof(options.notes[step - 1]);
  osc.frequency.value = note;

  self.beet.utils.envelope(gain.gain, time, {
    start: 0.0,
    peak: 0.8,
    attack: options.a,
    release: options.r,
    decay: options.d,
    sustain: options.s
  });
  osc.start(time);
  osc.stop(time + options.a + options.d + options.r + 0.5);
};

module.exports = Sound;