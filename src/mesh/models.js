import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export const stickmanUrl =
  'https://raw.githubusercontent.com/Qweeqer/Stickman/main/src/mesh/Stickman.glb';
export const trackFloorUrl =
  'https://raw.githubusercontent.com/Qweeqer/Stickman/main/src/mesh/TrackFloor.glb';
export const brainUrl =
  'https://raw.githubusercontent.com/Qweeqer/Stickman/main/src/mesh/Brain.glb';

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
    trackFloor.position.set(x=0, y=0, z=0); // замените x, y и z на желаемые координаты
    scene.add(trackFloor);
  });

  // Загрузка меша мозга
  loader.load(brainUrl, function (gltf) {
      const brain = gltf.scene;
      brain.position.set(0, 0, );
    scene.add(brain);
  });
}

export function updateAnimation(delta) {
  if (mixer) {
    mixer.update(delta);
  }
}
