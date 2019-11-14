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

var geometry = new THREE.BoxGeometry(20, 20, 20);
var cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
});
var cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);

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

const save_json = () => {
  var result = cube.toJSON();
  localStorage.setItem("json", JSON.stringify(result));
  console.log(JSON.stringify(result));
};

var json = localStorage.getItem("json");
if (json) {
  var loadedGeometry = JSON.parse(json);
  var loader = new THREE.ObjectLoader();
  loadedMesh = loader.parse(loadedGeometry);
  loadedMesh.position.x -= 50;
  scene.add(loadedMesh);
}

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

addLight();
animate();
save_json();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
