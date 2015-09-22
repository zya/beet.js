var THREE = require('three');

function Scene(name, beet, options) {
  var self = this;
  this.beet = beet;
  this.name = name;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(50, 1);
  this.camera.position.z = 300;

  this.circleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });

  this.circleGeometry = new THREE.CircleGeometry(100, 50);

  self.circleGeometry.verticesNeedUpdate = true;
  this.circle = new THREE.Mesh(self.circleGeometry, self.circleMaterial);
  this.scene.add(self.circle);

  var points = 19;
  for (var i = 0; i < points; i++) {
    var angle = (2 / points) * Math.PI * i;
    var y = 100 * Math.cos(angle);
    var x = 100 * Math.sin(angle);

    var mesh = new THREE.Mesh(self.circleGeometry);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.05;
    mesh.position.y = y;
    mesh.position.x = x;
    self.scene.add(mesh);
  }

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

module.exports = Scene;
