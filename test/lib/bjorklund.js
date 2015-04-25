var bjork = require('../../lib/bjorklund.js');
var assert = require('chai').assert;

describe('bjorklund', function () {

  it('returns 10100 for (2,5)', function () {
    assert.equal(bjork(2, 5), '10100');
  });

  it('returns 10010010010010000 for (5,16)', function () {
    assert.equal(bjork(5, 16), '1001001001001000');
  });

  it('returns 101111 for (5,6)', function () {
    assert.equal(bjork(5, 6), '101111');
  });

  it('returns 101010101 for (5,9)', function () {
    assert.equal(bjork(5, 9), '101010101');
  });

  it('returns 1000100010001000 for (4, 16)', function () {
    assert.equal(bjork(4, 16), '1000100010001000');
  });

});