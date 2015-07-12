module.exports.envelope = function (audioParam, now, opts) {
  if (!opts) opts = {};
  var peak = opts.peak || audioParam.defaultValue;
  if (opts.start === 0) opts.start = 0.000001;
  var start = opts.start || audioParam.value;
  var attack = opts.attack || 0.1;
  var decay = opts.decay || 0.0;
  var sustain = opts.sustain || peak;
  var release = opts.release || 0.5;

  audioParam.setValueAtTime(start, now);
  audioParam.linearRampToValueAtTime(peak, now + attack);
  audioParam.linearRampToValueAtTime(sustain, now + attack + decay);
  audioParam.linearRampToValueAtTime(0, now + attack + decay + release);
};