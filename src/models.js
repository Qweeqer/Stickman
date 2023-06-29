import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import stickmanUrl from '../assets/Stickman.glb';
// import trackFloorUrl from '../assets/TrackFloor.glb';
// import brainUrl from '../assets/Brain.glb';

const stickmanUrl = './mesh/Stickman.glb';
const trackFloorUrl = './mesh/TrackFloor.glb';
const brainUrl = './mesh/Brain.glb';

let mixer;
let stickman;

const loader = new GLTFLoader();

export function loadModels(scene) {
  // Загрузка меша персонажа
  loader.load(stickmanUrl, function (gltf) {
    stickman = gltf.scene;
    mixer = new THREE.AnimationMixer(stickman);
    const runAction = mixer.clipAction(gltf.animations[0]);
    runAction.play();
    scene.add(stickman);
  });

  // Загрузка меша трека
  loader.load(trackFloorUrl, function (gltf) {
    const trackFloor = gltf.scene;
    scene.add(trackFloor);
  });

  // Загрузка меша мозга
  loader.load(brainUrl, function (gltf) {
    const brain = gltf.scene;
    scene.add(brain);
  });
}

export function updateAnimation(delta) {
  if (mixer) {
    mixer.update(delta);
  }
}
