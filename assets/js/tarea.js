import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ----------------- Escena -----------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x666666);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 4, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ----------------- Luces -----------------
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 0.6);
dir.position.set(2, 6, 2);
scene.add(dir);

// ----------------- Texturas -----------------
const loader = new THREE.TextureLoader();

// Piso (pasto)
const grass = loader.load('./assets/img/suelo_agua.jpg');
grass.wrapS = THREE.RepeatWrapping;
grass.wrapT = THREE.RepeatWrapping;
grass.repeat.set(8, 8);

const rainTex = loader.load('./assets/img/textura_agua.jpg');
rainTex.wrapS = THREE.RepeatWrapping;
rainTex.wrapT = THREE.RepeatWrapping;

// ----------------- Piso -----------------
const FLOOR_SIZE = 20;
const floorGeo = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
const floorMat = new THREE.MeshStandardMaterial({
  map: grass,
  roughness: 1.0,
  metalness: 0.0,
  side: THREE.DoubleSide
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.2;
scene.add(floor);

// ----------------- Lluvia estática -----------------
const RAIN_COUNT = 800;
const AREA = 15;
const rainGroup = new THREE.Group();

for (let i = 0; i < RAIN_COUNT; i++) {
  const geo = new THREE.BoxGeometry(0.05, 1.5, 0.05);
  const mat = new THREE.MeshStandardMaterial({
    map: rainTex,
    transparent: true,
    opacity: 0.35,
    roughness: 0.5,
    metalness: 0.1,
    depthWrite: false
  });

  const drop = new THREE.Mesh(geo, mat);
  drop.position.set(
    THREE.MathUtils.randFloatSpread(AREA),
    THREE.MathUtils.randFloat(0, 8),
    THREE.MathUtils.randFloatSpread(AREA)
  );
  rainGroup.add(drop);
}

scene.add(rainGroup);

// ----------------- Render -----------------
function animate() {
  controls.update();
  renderer.render(scene, camera);
}

// ----------------- Resize -----------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
