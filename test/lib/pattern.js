var assert = require('chai').assert;
var Pattern = require('../../lib/pattern');

describe('Pattern', function () {
  describe('constructor', function () {
    it('uses the the value of pulses for steps if steps is not present', function () {
      var pattern = new Pattern(4);
      assert.deepEqual(pattern.seq, ['1', '1', '1', '1']);
    });
  });

  describe('.shift(offset)', function () {
    it('shifts the Pattern by 1', function () {
      var seq = new Pattern(1, 4);
      seq.shift(1);
      assert.deepEqual(seq.seq, ['0', '1', '0', '0']);
    });

    it('shifts the Pattern by 2', function () {
      var seq = new Pattern(1, 4);
      seq.shift(2);
      assert.deepEqual(seq.seq, ['0', '0', '1', '0']);
    });

    it('shifts the Pattern by 3', function () {
      var seq = new Pattern(1, 4);
      seq.shift(3);
      assert.deepEqual(seq.seq, ['0', '0', '0', '1']);
    });

    it('shifts the Pattern by 4', function () {
      var seq = new Pattern(1, 4);
      seq.shift(4);
      assert.deepEqual(seq.seq, ['1', '0', '0', '0']);
    });

    it('shifts the Pattern by a value larger than the steps', function () {
      var seq = new Pattern(1, 4);
      seq.shift(5);
      assert.deepEqual(seq.seq, ['0', '1', '0', '0']);
    });
  });

});