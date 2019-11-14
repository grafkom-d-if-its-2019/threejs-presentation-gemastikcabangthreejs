let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
let renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xeeeeee));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

var geometry = new THREE.Geometry();
var cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
});

for (var i = 0; i < 10000; i++) {
  var cubeMesh = addcube();
//   cubeMesh.updateMatrix();
//   geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
  scene.add(cubeMesh);
}
// scene.add(new THREE.Mesh(geometry, cubeMaterial));

var rotation = 0;

const addLight = () => {
  let lights = [];
  let lamps = [];

  let lampMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  let lampGeometry = new THREE.SphereGeometry(0.5, 32, 32);

  let light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(-50, -25, 0);
  lights.push(light);

  let lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.set(-50, -25, 0);
  //   lamps.push(lamp);

  light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(50, 25, 0);
  lights.push(light);

  lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.set(50, 25, 0);
  // lamps.push(lamp);

  scene.add(...lights);
  //   scene.add(...lamps);
};

function addcube() {
  var cubeSize = 2.0;
  var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  // position the cube randomly in the scene
  cube.position.x = -60 + Math.round(Math.random() * 100);
  cube.position.y = Math.round(Math.random() * 10);
  cube.position.z = -150 + Math.round(Math.random() * 175);
  // add the cube to the scene
  return cube;
}

function render() {
  rotation += 0.005;
  stats.update();
  camera.position.x = Math.sin(rotation) * 50;
  camera.position.z = Math.cos(rotation) * 50;
  camera.lookAt(scene.position);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

addLight();
animate();

function animate() {
  rotation += 0.005;

  camera.position.x = Math.sin(rotation) * 50;
  camera.position.z = Math.cos(rotation) * 50;
  camera.lookAt(scene.position);
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
