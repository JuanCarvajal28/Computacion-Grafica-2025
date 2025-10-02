import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xB3E0FF);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// --- TORUS 1: Material plano (color sólido)
const geometryTorus = new THREE.TorusGeometry(1, 0.4, 16, 100);
const materialTorus1 = new THREE.MeshStandardMaterial({
  color: 0x87CEFA,
  roughness: 0.5,
  metalness: 0.2
});
const torus1 = new THREE.Mesh(geometryTorus, materialTorus1);
scene.add(torus1);
torus1.position.set(-4, 0, 0);

// --- TORUS 2: Textura difusa (lava)
const lavaTexture = new THREE.TextureLoader().load('./assets/img/Lava004_4K-JPG_Color.jpg');
const lavaNormal = new THREE.TextureLoader().load('./assets/img/Lava004_4K-JPG_NormalGL.jpg');
const lavaRough = new THREE.TextureLoader().load('./assets/img/Lava004_4K-JPG_Roughness.jpg');
const lavaEmission = new THREE.TextureLoader().load('./assets/img/Lava004_4K-JPG_Emission.jpg');

const materialTorus2 = new THREE.MeshStandardMaterial({
  map: lavaTexture,
  normalMap: lavaNormal,
  roughnessMap: lavaRough,
  emissiveMap: lavaEmission,
  emissive: new THREE.Color(0xff4500),
  emissiveIntensity: 0.5,
  roughness: 1,
  metalness: 0.2
});

const torus2 = new THREE.Mesh(geometryTorus, materialTorus2);
scene.add(torus2);
torus2.position.set(0, 0, 0);

// --- TORUS 3: Textura con relieve (Roca)
const rockTexture = new THREE.TextureLoader().load('./assets/img/Rock058_4K-JPG_Color.jpg');
const rockNormal = new THREE.TextureLoader().load('./assets/img/Rock058_4K-JPG_NormalGL.jpg');
const rockRough = new THREE.TextureLoader().load('./assets/img/Rock058_4K-JPG_Roughness.jpg');

const materialTorus3 = new THREE.MeshStandardMaterial({
  map: rockTexture,
  normalMap: rockNormal,
  roughnessMap: rockRough,
  metalness: 0.8,
  roughness: 1,
});
const torus3 = new THREE.Mesh(geometryTorus, materialTorus3);
scene.add(torus3);
torus3.position.set(4, 0, 0);

camera.position.z = 8;
controls.update();

// --- ANIMATE ---
function animate() {
  torus1.rotation.x += 0.01;
  torus1.rotation.y += 0.01;

  torus2.rotation.x += 0.01;
  torus2.rotation.y += 0.01;

  torus3.rotation.x += 0.01;
  torus3.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

// --- LUCES ---
const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
pointLight.position.set(0, 2, 2);
scene.add(pointLight);

