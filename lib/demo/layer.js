var THREE = require('three');
var circleGeometry = new THREE.CircleGeometry(50, 100);

var activeMaterial = new THREE.MeshBasicMaterial({
  color: 0xCDDC39
});
var inactiveMaterial = new THREE.MeshBasicMaterial({
  color: 0x757575
});
var currentMaterial = new THREE.MeshBasicMaterial({
  color: 0xFAFAFA
});
var circleMaterial = new THREE.MeshBasicMaterial({
  color: 0x880E4F
});

function addPoints(slots, seq, origin, r) {
  var self = this;
  for (var i = 0; i < seq.length; i++) {
    var angle = (2 / seq.length) * Math.PI * i;
    var y = origin.y + r * Math.cos(angle);
    var x = origin.x + r * Math.sin(angle);

    var color = seq[i] === '1' ? activeMaterial : inactiveMaterial;

    var mesh = new THREE.Mesh(new THREE.CircleGeometry(r, 100), color);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.08;
    mesh.position.y = y;
    mesh.position.x = x;
    mesh.position.z = 2;

    slots.push(mesh);
  }

  return slots;
}

function Layer(beet, index, pulses, slots, radius, cb, multi) {
  var self = this;
  var points = [];

  self.circleGeometry = new THREE.CircleGeometry(radius, 50);

  var circle = new THREE.Mesh(self.circleGeometry, circleMaterial);
  if (multi) circle.position.x = index * -110 + 60;

  var currentCircle = new THREE.Mesh(self.circleGeometry, currentMaterial);
  currentCircle.scale.x = currentCircle.scale.y = currentCircle.scale.z = 0.12;
  currentCircle.position.copy(circle.position);
  currentCircle.position.z = 0;

  var pattern = beet.pattern(pulses, slots);

  var on = function(time, step, drawTime) {
    cb(time, step, drawTime);
    setTimeout(function() {
      var current = self.points[step - 1];
      if (current) {
        self.currentCircle.position.copy(current.position);
        self.currentCircle.position.z = 1;
      }
    }, drawTime * 1000 - 50);
  };

  var off = function(time, step, drawTime) {
    setTimeout(function() {
      var current = self.points[step - 1];
      if (current) {
        self.currentCircle.position.copy(current.position);
        self.currentCircle.position.z = 1;
      }
    }, drawTime * 1000 - 50);
  };

  this.circle = circle;
  this.currentCircle = currentCircle;
  this.audioLayer = beet.layer(pattern, on, off);
  this.points = addPoints(points, pattern.seq, circle.position, radius);
}

module.exports = Layer;
