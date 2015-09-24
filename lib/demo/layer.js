var THREE = require('three');
var circleGeometry = new THREE.CircleGeometry(50, 50);

var activeMaterial = new THREE.MeshBasicMaterial({
  color: 'green'
});
var inactiveMaterial = new THREE.MeshBasicMaterial({
  color: 'grey'
});
var currentMaterial = new THREE.MeshBasicMaterial({
  color: 'red'
});
var circleMaterial = new THREE.MeshBasicMaterial({
  color: 'white'
});

function addPoints(slots, seq, origin, r) {
  for (var i = 0; i < seq.length; i++) {
    var angle = (2 / seq.length) * Math.PI * i;
    var y = origin.y + r * Math.cos(angle);
    var x = origin.x + r * Math.sin(angle);
    var color = seq[i] === '1' ? activeMaterial : inactiveMaterial;
    var mesh = new THREE.Mesh(circleGeometry, color);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.05;
    mesh.position.y = y;
    mesh.position.x = x;
    mesh.position.z = 2;
    slots.push(mesh);
  }

  return slots;
}

function Layer(beet, index, pulses, slots, radius, cb, multi) {
  var self = this;
  self.circleGeometry = new THREE.CircleGeometry(radius, 50);
  var circle = new THREE.Mesh(self.circleGeometry, circleMaterial);
  var currentCircle = new THREE.Mesh(self.circleGeometry, currentMaterial);
  currentCircle.scale.x = currentCircle.scale.y = currentCircle.scale.z = 0.07;
  if (multi) circle.position.x = index * -110 + 60;
  currentCircle.position.copy(circle.position);
  currentCircle.position.z = 0;
  var pattern = beet.pattern(pulses, slots);
  var points = [];
  this.circle = circle;
  this.currentCircle = currentCircle;
  this.points = addPoints(points, pattern.seq, circle.position, radius);
  var on = function(time, step, drawTime) {
    cb(time, step, drawTime);
    setTimeout(function() {
      var current = self.points[step - 1];
      if (current) self.currentCircle.position.copy(current.position);
    }, drawTime * 1000 - 50);
  };
  var off = function(time, step, drawTime) {
    setTimeout(function() {
      var current = self.points[step - 1];
      if (current) self.currentCircle.position.copy(current.position);
    }, drawTime * 1000 - 50);
  };
  this.audioLayer = beet.layer(pattern, on, off);
}

module.exports = Layer;
