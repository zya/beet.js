var utils = require('../../lib/utils');
var assert = require('chai').assert;

describe('utils', function () {
  describe('.mtof(midi)', function () {
    it('converts midi notes to frequency', function () {
      var a4 = utils.mtof(69);
      assert.equal(a4, 440);
      var c4 = utils.mtof(60);
      assert.equal(c4.toFixed(1), 261.6);
      var gb5 = utils.mtof(78);
      assert.equal(gb5.toFixed(2), 739.99);
      var c1 = utils.mtof(24);
      assert.equal(c1.toFixed(2), 32.70);
    });
  });

  describe('.ntof(note)', function () {
    it('converts a note name to a frequency', function () {
      var a4 = utils.ntof('a4');
      assert.equal(a4, 440);
      var gb7 = utils.ntof('gb5');
      assert.equal(gb7.toFixed(2), 739.99);
      var c1 = utils.ntof('c1');
      assert.equal(c1.toFixed(2), 32.70);
    });
  });

  describe('.mtop(midi)', function () {
    it('converts a midi note to a playback rate', function () {
      var c4 = utils.mtop(60);
      assert.equal(c4, 1);
      var c5 = utils.mtop(72);
      assert.equal(c5, 2);
      var c3 = utils.mtop(48);
      assert.equal(c3, 0.5);
      var a4 = utils.mtop(69);
      assert.equal(a4.toFixed(2), 1.68);
    });
  });
});