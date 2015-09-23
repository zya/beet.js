var THREE = require('three');

function Scene(name, beet, options) {
  var self = this;
  this.beet = beet;
  this.name = name;

  this.slots = [];

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(50, 1);
  this.camera.position.z = 300;

  this.offColor = new THREE.Color(0.5, 0.5, 0.5);
  this.onColor = new THREE.Color('red');

  this.circleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });

  this.activeMaterial = new THREE.MeshBasicMaterial({
    color: self.onColor
  });

  this.inactiveMaterial = new THREE.MeshBasicMaterial({
    color: self.offColor
  });

  this.circleGeometry = new THREE.CircleGeometry(100, 50);

  self.circleGeometry.verticesNeedUpdate = true;
  this.circle = new THREE.Mesh(self.circleGeometry, self.circleMaterial);
  this.scene.add(self.circle);

  this.pattern = beet.pattern(options.pulses, options.slots);

  this._addPoints();

  this.renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  this.renderer.setSize(500, 500);
  document.body.appendChild(self.renderer.domElement);
}

Scene.prototype.render = function() {
  var self = this;
  this.renderer.render(self.scene, self.camera);
};

Scene.prototype._addPoints = function() {
  var self = this;

  self.slots.forEach(function(slot) {
    self.scene.remove(slot);
  });

  this.slots = [];

  for (var i = 0; i < self.pattern.seq.length; i++) {
    var angle = (2 / self.pattern.seq.length) * Math.PI * i;
    var y = 100 * Math.cos(angle);
    var x = 100 * Math.sin(angle);

    var color = self.pattern.seq[i] === '1' ? self.activeMaterial : self.inactiveMaterial;
    var mesh = new THREE.Mesh(self.circleGeometry, color);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.05;
    mesh.position.y = y;
    mesh.position.x = x;
    self.slots.push(mesh);
  }

  this.slots.forEach(function(slot, index) {
    self.scene.add(slot);
  });
};

Scene.prototype.change = function(options) {
  var self = this;
  self.pattern = self.beet.pattern(options.pulses, options.slots);
  self._addPoints();
};

module.exports = Scene;
