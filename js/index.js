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

var groundGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
var groundMesh = new THREE.MeshBasicMaterial({color: 0x000000, transparent: true, opacity: 0.5});
let ground = new THREE.Mesh(groundGeometry, groundMesh);
// scene.add(ground);

let geometry = new THREE.ConeGeometry(5, 15, 15);
let material = new THREE.MeshPhongMaterial({color: 0x00ff00});
let cone = new THREE.Mesh(geometry, material);
cone.castShadow = false;
// scene.add(cone);

cone.position.x = -30;
cone.position.y = 0;
cone.position.z = 0;

geometry = new THREE.BoxGeometry(10,10,10);
material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

cube.position.x = 30;
cube.position.y = 0;
cube.position.z = 0;

group = new THREE.Group();
group.add(cone);
group.add(cube);

scene.add(group);

let arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), group.position, 10, 0x0000ff);
scene.add(arrow);

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
  // lamps.push(lamp);

  light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(50, 25, 0);
  lights.push(light);

  lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.set(50, 25, 0);
  // lamps.push(lamp);

  scene.add(...lights);
  scene.add(...lamps);
};

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

addLight();
animate();

function animate() {
  requestAnimationFrame(animate);

  // cone.rotation.x += 0.01;
  // cone.rotation.Y += 0.01;

  // cube.rotation.x += 0.01;
  // cube.rotation.Y += 0.01;

  group.rotation.x += 0.01;
  group.rotation.Y += 0.01;

  renderer.render(scene, camera);
}
