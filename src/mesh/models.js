import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export const stickmanUrl =
  'https://raw.githubusercontent.com/Qweeqer/Stickman/main/src/mesh/Stickman.glb';
export const trackFloorUrl =
  'https://raw.githubusercontent.com/Qweeqer/Stickman/main/src/mesh/TrackFloor.glb';
export const brainUrl =
  'https://raw.githubusercontent.com/Qweeqer/Stickman/main/src/mesh/Brain.glb';

let mixer;
export let stickman; // Экспорт переменной stickman
let trackFloor;
let brain;
let runAction;

const loader = new GLTFLoader();

export function loadModels(scene) {
  return new Promise((resolve, reject) => {
    // Загрузка меша персонажа
    loader.load(stickmanUrl, function (gltf) {
      console.log('gltf.stickman', gltf);
      stickman = gltf.scene;
      mixer = new THREE.AnimationMixer(stickman);
      runAction = mixer.clipAction(gltf.animations[4]);
      runAction.play();
      // stickman.position.set(0, 0, 0);
      stickman.rotation.y = Math.PI; // Поворот модели на 180 градусов вокруг оси Y

      stickman.castShadow = true;

      scene.add(stickman);

      // Загрузка меша трека
      loader.load(trackFloorUrl, function (gltf) {
        console.log('gltf.trackFloor', gltf);
        trackFloor = gltf.scene;
        trackFloor.position.set(0, 0, 9);
        trackFloor.receiveShadow = true;
        scene.add(trackFloor);

        // Загрузка меша мозга
        loader.load(brainUrl, function (gltf) {
          console.log('gltf.brain', gltf);
          brain = gltf.scene;
          brain.position.set(0, 0, 3);
          brain.receiveShadow = true;
          scene.add(brain);

          resolve(); // Разрешение промиса после загрузки всех моделей
        });
      });
    });
  });
}

export function updateAnimation(delta) {
  if (mixer) {
    mixer.update(delta);
  }
}


