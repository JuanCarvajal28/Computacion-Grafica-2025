import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, renderer, camera, stats;
let model, skeleton, mixer, clock;
let currentModel = null;
const modelPaths = {
    "Joel": "./assets/models/glb/joel_the_last_of_us.glb",
    "Guitarra Ellie": "./assets/models/glb/guitarra_ellie_the_last_of_us.glb",
    "The Last Of Us Escena": "./assets/models/glb/the_last_of_us.glb"
};
const loader = new GLTFLoader();

const crossFadeControls = [];

let currentBaseAction = 'idle';
const allActions = [];
const baseActions = {
    idle: { weight: 1 },
    walk: { weight: 0 },
    run: { weight: 0 }
};
const additiveActions = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 }
};
let panelSettings, numAnimations;

init();
animate(); 

function init() {

    const container = document.getElementById('container');
    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    // ground

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    createPanel();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(- 1, 2, 3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minDistance = 0.5;
    controls.maxDistance = 20;
    controls.target.set(0, 1, 0);
    controls.update();

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);

    // Audio
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('./assets/audio/halloween.mp3', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}

function createPanel() {
    const panel = new GUI({ width: 310 });
    const folder1 = panel.addFolder('Modelos');
    const modelOptions = Object.keys(modelPaths);
    const settings = { modelo: modelOptions[0] };

    folder1.add(settings, 'modelo', modelOptions).name('Seleccionar modelo').onChange((value) => {
        loadModel(modelPaths[value]);
    });
    folder1.open();
    loadModel(modelPaths[settings.modelo]);
}

function loadModel(path) {
    if (currentModel) {
        scene.remove(currentModel);
        currentModel.traverse(child => {
            if (child.isMesh) {
                child.geometry.dispose();
                if (child.material.map) child.material.map.dispose();
                child.material.dispose();
            }
        });
        currentModel = null;
    }
    loader.load(path, (gltf) => {
        currentModel = gltf.scene;
        scene.add(currentModel);
    });
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
}