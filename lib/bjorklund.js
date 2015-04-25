var _ = require('lodash');

module.exports = function bjorklund(pulses, length) {
  var ones = [];
  ones.length = pulses;
  _.fill(ones, '1');
  var zeros = [];
  zeros.length = length - pulses;
  _.fill(zeros, '0');
  return generate(ones, zeros);

};

function generate(ones, zeros) {
  if (zeros.length > 0) {
    var zipped = _.zip(ones, zeros).map(function (item) {
      return _.compact(item).join().replace(/,/g, '');
    });
    var partitioned = _.partition(zipped, function (item) {
      return item.length > 1;
    });
    return generate(partitioned[0], partitioned[1]);
  } else {
    return ones.reverse().join().replace(/,/g, '');
  }
}