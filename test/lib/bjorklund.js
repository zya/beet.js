var bjork = require('../../lib/bjorklund.js');
var assert = require('chai').assert;

describe('bjorklund', function () {

  it('returns 10 for (1, 2)', function () {
    assert.equal(bjork(1, 2), '10');
  });

  it('returns 100 for (1, 3)', function () {
    assert.equal(bjork(1, 3), '100');
  });

  it('returns 100 for (1, 4)', function () {
    assert.equal(bjork(1, 4), '1000');
  });

  it('returns 101 for (2, 3)', function () {
    assert.equal(bjork(2, 3), '101');
  });

  it('returns 10100 for (2,5)', function () {
    assert.equal(bjork(2, 5), '10100');
  });

  it('returns 1011 for (3, 4)', function () {
    assert.equal(bjork(3, 4), '1011');
  });

  it('returns 10101 for (3, 5)', function () {
    assert.equal(bjork(3, 5), '10101');
  });

  it('returns 1010100 for (3, 7)', function () {
    assert.equal(bjork(3, 7), '1010100');
  });

  it('returns 1000100010001000 for (4, 16)', function () {
    assert.equal(bjork(4, 16), '1000100010001000');
  });

  it('returns 101111 for (5,6)', function () {
    assert.equal(bjork(5, 6), '101111');
  });
  it('returns 10101101 for (5,8)', function () {
    assert.equal(bjork(5, 8), '10101101');
  });

  it('returns 10010010010010000 for (5,16)', function () {
    assert.equal(bjork(5, 16), '1001001001001000');
  });

  it('returns 101010101 for (5,9)', function () {
    assert.equal(bjork(5, 9), '101010101');
  });

  it('returns 10101010100 for (5, 11)', function () {
    assert.equal(bjork(5, 11), '10101010100');
  });

  it('returns 10111111 for (7, 8)', function () {
    assert.equal(bjork(7, 8), '10111111');
  });

});