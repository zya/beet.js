var THREE = require('three');
var Layer = require('./layer');

function Scene(name, beet, options) {
  var self = this;
  this.beet = beet;
  this.name = name;
  this.r = 100 / options.layers.length;
  this.w = 500;
  this.h = 500;
  this.layers = [];

  this.slots = [];

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(50, self.w / self.h);
  this.camera.position.z = 300;

  options.layers.forEach(function(layer, index) {
    var l = new Layer(self.beet, index, layer.pulses, layer.slots, self.r, layer.cb, options.layers.length > 1);
    self.scene.add(l.circle);
    l.points.forEach(function(point) {
      self.scene.add(point);
    });
    self.scene.add(l.currentCircle);
    self.beet.add(l.audioLayer);
    self.layers.push(l);
  });

  this.renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  this.renderer.setSize(self.w, self.h);
  document.body.appendChild(self.renderer.domElement);
}

Scene.prototype.render = function() {
  var self = this;
  this.renderer.render(self.scene, self.camera);
};

Scene.prototype.change = function(options) {
  var self = this;
  self.pattern.update(options.pulses, options.slots);
  addPoints();
};

module.exports = Scene;
