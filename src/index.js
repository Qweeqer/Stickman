import * as THREE from 'three';
import { loadModels, updateAnimation } from './mesh/models.js';

// Инициализация сцены
const scene = new THREE.Scene();
let stickman; // Переменная stickman

scene.fog = new THREE.Fog(0x363d3d, -1, 3000);
scene.fog.near = 0; // Замените 0 на желаемое значение ближней дальности
scene.fog.far = 1000; // Замените 1000 на желаемое значение дальней дальности

// Initialize the lights.
const ambientLight = new THREE.AmbientLight(0xff8844, 0.5);
const spotLight = new THREE.SpotLight(0xffffff, 0.7);
spotLight.position.set(200, 200, 0);
spotLight.castShadow = false;
scene.add(ambientLight);
scene.add(spotLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.1); // Попробуйте увеличить интенсивность
scene.add(hemisphereLight);

// Инициализация камеры
// const camera = new THREE.PerspectiveCamera(
//   80,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   2000
// );

// Инициализация рендерера
const renderer = new THREE.WebGLRenderer();
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 5;
const far = 2000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Обработчик изменения размера окна
window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Загрузка моделей и инициализация игры после загрузки
loadModels(scene).then(() => {
  stickman = loadModels.stickman; // Присваивание переменной stickman экспортированного значения из loadModels
  camera.position.set(1, 4, 5.5);

  // Обратить внимание, что позиция камеры устанавливается после загрузки моделей
  if (stickman) {
    camera.lookAt(stickman.position);
  }

  // Создание нового экземпляра Clock
  const clock = new THREE.Clock();

  // Ваш основной цикл анимации
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    updateAnimation(delta);
    renderer.render(scene, camera);
  }

  animate();
});
