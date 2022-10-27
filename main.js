import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 6, 0);
//model
let root;
const loader = new GLTFLoader();
loader.load("./turno.glb", (glb) => {
  root = glb.scene;
  scene.add(root);
});
//lightning
const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(light);

//renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.gamaOutput = true;

//onClick

let isMouseDown = false;

//Reload
document.getElementById("reload").onclick =  ()=> {
  camera.position.set(0, 5, 0);
  root.rotation.y = 0;
  root.rotation.z = 0;
};
// object rotation 
function init() {
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
}

function onMouseDown() {
  isMouseDown = true;
}

function onMouseUp() {
  isMouseDown = false;
}
const move = () => {
  root.rotation.y += -0.009;
  root.rotation.z += 0.009;
};
//control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.minDistance = 6;
controls.maxDistance = 8;
init();

//animate
let animate = () => {
  //rotation

  if (root) {
    controls.update();
    if (!isMouseDown) move();
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
