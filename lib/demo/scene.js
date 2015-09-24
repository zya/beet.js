var THREE = require('three');
var Layer = require('./layer');
var context = require('./context');

function Scene(name, options) {
  var self = this;
  this.beet = new Beet({
    context: context
  });
  this.name = name;
  this.r = 100 / options.layers.length;
  this.w = (window.innerWidth / 4) * options.layers.length;
  this.h = (window.innerWidth / 4) * options.layers.length;
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
    antialias: true,
    alpha: true
  });

  this.renderer.setSize(self.w, self.h);
  options.element.insertBefore(self.renderer.domElement, options.element.children[0]);
}

Scene.prototype.render = function() {
  var self = this;
  this.renderer.render(self.scene, self.camera);
};

Scene.prototype.change = function(options) {

};

Scene.prototype.start = function() {
  this.beet.start();
};

module.exports = Scene;
