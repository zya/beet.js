var assert = require('chai').assert;
var Sequence = require('../../lib/sequence');

describe('sequence', function () {
  describe('shift', function () {
    it('shifts the sequence by 1', function () {
      var seq = new Sequence(1, 4);
      seq.shift(1);
      assert.deepEqual(seq.seq, ['0', '1', '0', '0']);
    });

    it('shifts the sequence by 2', function () {
      var seq = new Sequence(1, 4);
      seq.shift(2);
      assert.deepEqual(seq.seq, ['0', '0', '1', '0']);
    });

    it('shifts the sequence by 3', function () {
      var seq = new Sequence(1, 4);
      seq.shift(3);
      assert.deepEqual(seq.seq, ['0', '0', '0', '1']);
    });

    it('shifts the sequence by 4', function () {
      var seq = new Sequence(1, 4);
      seq.shift(4);
      assert.deepEqual(seq.seq, ['1', '0', '0', '0']);
    });

    it('shifts the sequence by a value larger than the steps', function () {
      var seq = new Sequence(1, 4);
      seq.shift(5);
      assert.deepEqual(seq.seq, ['0', '1', '0', '0']);
    });
  });

});
