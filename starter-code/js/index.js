let meshes, lamps, lights, result, moving;

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
let renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight - 10);
renderer.setClearColor(new THREE.Color(0xeeeeee));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;
camera.lookAt(scene.position);

const addLight = () => {
  lights = [];
  lamps = [];
  let lampMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  let lampGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  let light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(-50, -25, 0);
  lights.push(light);
  let lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.set(-50, -25, 0);
  lamps.push(lamp);

  light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(50, 25, 0);
  lights.push(light);
  lamp = new THREE.Mesh(lampGeometry, lampMaterial);
  lamp.position.set(50, 25, 0);
  lamps.push(lamp);

  scene.add(...lights);
  scene.add(...lamps);
};

function addObject() {
  meshes = [];

  let geometry = new THREE.ConeGeometry(5, 20, 32);
  let material = new THREE.MeshPhongMaterial({
    color: 0x00ff00
  });

  let mesh = new THREE.Mesh(geometry, material);
  meshes.push(mesh);

  geometry = new THREE.BoxGeometry(10, 10, 10);
  mesh = new THREE.Mesh(geometry, material);
  meshes.push(mesh);

  meshes.forEach((mesh, idx) => {
    mesh.position.x = idx * 5;
    mesh.position.y = 0;
    mesh.position.z = 0;
  });

  scene.add(...meshes);
}

addLight();
addObject();
animate();

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
