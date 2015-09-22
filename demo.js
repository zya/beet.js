var dat = require('dat-gui');

var Scene = require('./lib/demo/scene');

var scene = new Scene('eu', {}, {});

function animate() {
  requestAnimationFrame(animate);
  scene.render();
}

animate();
