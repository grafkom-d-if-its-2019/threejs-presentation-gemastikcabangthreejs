var scene = new THREE.Scene();

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

var geometry = new THREE.BoxBufferGeometry(10, 10, 10);
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

const save_json_scene = () => {
  var exporter = new THREE.SceneExporter();
  console.log(scene);
  var sceneJson = JSON.stringify(exporter.parse(scene));
  localStorage.setItem("scene", sceneJson);
  console.log(sceneJson);
};

const load_json_scene = () => {
  var json = localStorage.getItem("scene");
  var sceneLoader = new THREE.SceneLoader();
  sceneLoader.parse(
    JSON.parse(json),
    function(e) {
      scene = e.scene;
    },
    "."
  );
};

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

addLight();
animate();
save_json_scene();
// load_json_scene();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
