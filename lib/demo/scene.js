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
  this.h = window.innerWidth / 4;
  this.layers = [];
  this.element = options.element;
  console.log(options.layers.length);
  this.playButton = self.element.childNodes[3];
  this.slots = [];
  this.started = false;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(50, self.w / self.h);
  this.camera.position.z = 300 / options.layers.length;

  options.layers.forEach(function(layer, index) {
    var l = new Layer(self.beet, index, layer.pulses, layer.slots, self.r, layer.cb, options.layers.length);
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
  this.element.insertBefore(self.renderer.domElement, self.element.children[0]);
  this._addEventListeners();
}

Scene.prototype.render = function() {
  var self = this;
  this.renderer.render(self.scene, self.camera);
};

Scene.prototype.change = function(options) {

};

Scene.prototype.start = function() {
  var self = this;
  self.playButton.className = 'fa fa-stop icon';
  this.beet.start();
  self.started = true;
};

Scene.prototype.stop = function() {
  var self = this;
  self.playButton.className = 'fa fa-play icon';
  this.beet.stop();
  self.started = false;
};

Scene.prototype._addEventListeners = function() {
  var self = this;
  self.playButton.addEventListener('click', function() {
    if (self.started) {
      self.stop();
    } else {
      self.start();
    }
  });
};
module.exports = Scene;
