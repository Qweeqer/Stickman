import * as THREE from 'three';
import { loadModels, updateAnimation } from './models.js';

// Инициализация сцены
const scene = new THREE.Scene();

// Инициализация камеры
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

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




