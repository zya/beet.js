var notes = {
  "c": 0,
  "c#": 1,
  "db": 1,
  "d": 2,
  "d#": 3,
  "eb": 3,
  "e": 4,
  "f": 5,
  "f#": 6,
  "gb": 6,
  "g": 7,
  "g#": 8,
  "ab": 8,
  "a": 9,
  "a#": 10,
  "bb": 10,
  "b": 11
};

function mtof(midi_note) {
  console.log();
  return Math.pow(2, (midi_note - 69) / 12) * 440;
}

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

module.exports.load = function(context, path, success, failure) {
  var request = new XMLHttpRequest();
  request.open("GET", path, true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    context.decodeAudioData(request.response, success, failure);
  };
  request.onerror = failure;
  request.send();
};

module.exports.ntof = function ntof(note_name) {
  var split = note_name.split(/(\d+)/);
  var note = notes[split[0].toLowerCase()];
  var octave = parseInt(split[1], 10);
  return mtof(note + octave * 12 + 12);
};

module.exports.mtop = function mtop(midi_note) {
  return Math.pow(2, (midi_note - 60) / 12);
};
module.exports.mtof = mtof;