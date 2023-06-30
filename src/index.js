import * as THREE from 'three';
import { loadModels, updateAnimation } from './mesh/models.js';

// Инициализация сцены
const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x363d3d, -1, 3000);
scene.fog.near = 0; // Замените 0 на желаемое значение ближней дальности
scene.fog.far = 1000; // Замените 1000 на желаемое значение дальней дальности


// Initialize the lights.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const spotLight = new THREE.SpotLight(0xffffff, 0.8);
spotLight.position.set(200, 200, 0);
spotLight.castShadow = true;
scene.add(ambientLight);
scene.add(spotLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5); // Попробуйте увеличить интенсивность
scene.add(hemisphereLight);



// Инициализация камеры
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

camera.position.set(2, 4, 4.5);
// camera.position.x = 0; // смещение вправо
// camera.position.y = 6; // смещение вверх
// camera.position.z = 8; // смещение назад

// Инициализация рендерера
const renderer = new THREE.WebGLRenderer();
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

// Загрузка моделей
loadModels(scene);

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




