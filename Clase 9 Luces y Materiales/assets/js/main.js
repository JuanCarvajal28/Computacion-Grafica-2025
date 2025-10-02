import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFB5C0);

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

//estandard material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.5,
  metalness: 1
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// basic material 
const materialBasic = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 1
});
const cube2 = new THREE.Mesh(geometry, materialBasic);
scene.add(cube2);
cube2.position.x = -2;

//lambert material 
const materialLambert = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  emissive: 0xff0000,
  emissiveIntensity: 0.1
});
const cube3 = new THREE.Mesh(geometry, materialLambert);
scene.add(cube3);
cube3.position.x = 2;

//normal material 
const materialNormal = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 1,
  wireframe: true,
  wireframeLinewidth: 5,
  wireframeLinejoin: 'round',
  wireframeLinecap: 'round'
});
const cube4 = new THREE.Mesh(geometry, materialNormal);
scene.add(cube4);
cube4.position.x = -4;

//load image
const texture = new THREE.TextureLoader().load('./assets/img/ajedrez.jpg');
const materialTxt = new THREE.MeshStandardMaterial({
  map: texture,
  side: THREE.DoubleSide
});
const cube5 = new THREE.Mesh(geometry, materialTxt);
scene.add(cube5);
cube5.position.y = -2;

// Load Multiple Images
const materialCube = [
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/img/face1.jpg'),
    side: THREE.DoubleSide
  }),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/img/face2.jpg'),
    side: THREE.DoubleSide
  }),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/img/face3.jpg'),
    side: THREE.DoubleSide
  }),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/img/face4.jpg'),
    side: THREE.DoubleSide
  }),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/img/face5.jpg'),
    side: THREE.DoubleSide
  }),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./assets/img/face6.jpg'),
    side: THREE.DoubleSide
  })
];

const cube6 = new THREE.Mesh(geometry, materialCube);
scene.add(cube6);
cube6.position.y = 2;
cube6.position.x = -2;

camera.position.z = 5;
controls.update();

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;

  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.01;

  cube4.rotation.x += 0.01;
  cube4.rotation.y += 0.01;

  cube5.rotation.x += 0.01;
  cube5.rotation.y += 0.01;

  cube6.rotation.x += 0.01;
  cube6.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

//funcion create light
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

//point light
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(0, 1, 1);
scene.add(pointLight);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);
