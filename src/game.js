import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { stickmanUrl, trackFloorUrl, brainUrl } from './mesh/models.js';

class Character {
  constructor() {
    this.keysAllowed = {};

    this.element = new THREE.Group();
    this.mixer = null;
    this.character = null;
    this.characterURL = stickmanUrl;
    this.isRunning = false;
    this.runAction = null;
    this.moveLeftDirection = false;
    this.moveRightDirection = false;

    // Привязываем обработчики событий к экземпляру класса
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  loadCharacter() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        this.characterURL,
        gltf => {
          this.character = gltf.scene;
          this.mixer = new THREE.AnimationMixer(this.character);
          if (
            this.character.animations &&
            this.character.animations.length > 0
          ) {
            this.playAnimation(this.character.animations, 'Run');
            this.runAction = this.mixer.clipAction(
              this.character.animations[4]
            ); 
          }
          resolve();
        },
        undefined,
        reject
      );
    });
  }

  playAnimation(animations, name) {
    if (animations && animations.length > 0) {
      const clip = THREE.AnimationClip.findByName(animations, name);
      if (clip) {
        const action = this.mixer.clipAction(clip);
        action.play();
      }
    }
  }

  update() {
    if (this.mixer) {
      this.mixer.update(0.01);
    }

    if (this.isRunning) {
      this.moveForward();
    }

    if (this.moveLeftDirection) {
      this.moveLeft();
    }

    if (this.moveRightDirection) {
      this.moveRight();
    }
  }

  onUpKeyPressed() {
    this.isRunning = true;
    if (this.runAction) {
      this.mixer.stopAllAction();
      this.runAction.reset();
      this.runAction.play();
    }
  }

  onLeftKeyPressed() {
    this.moveLeftDirection = true;
    this.moveRightDirection = false;
  }

  onRightKeyPressed() {
    this.moveLeftDirection = false;
    this.moveRightDirection = true;
  }

  moveForward() {
    this.element.position.z -= 3;
    this.onUpKeyPressed();
  }

  moveLeft() {
    if (this.element.position.x > -3) {
      this.element.position.x -= 1;
    }
  }

  moveRight() {
    if (this.element.position.x < 3) {
      this.element.position.x += 1;
    }
  }

  onUnpause() {}

  onPause() {}

  handleKeyDown(e) {
    if (!this.gameOver) {
      const key = e.keyCode;
      if (this.keysAllowed[key] === false) return;
      this.keysAllowed[key] = false;
      if (this.paused && !this.collisionsDetected() && key > 18) {
        this.paused = false;
        this.character.onUnpause();
        document.getElementById('variable-content').style.visibility = 'hidden';
        document.getElementById('controls').style.display = 'none';
      } else {
        if (key === 80) {
          this.paused = true;
          this.onPause();
          document.getElementById('variable-content').style.visibility =
            'visible';
          document.getElementById('variable-content').innerHTML =
            'Game is paused. Press any key to resume.';
        }
        if (key === 38 && !this.paused) {
          this.onUpKeyPressed();
          console.log('Up key pressed');
        }
        if (key === 37 && !this.paused) {
          this.moveLeftDirection = true;
          this.moveRightDirection = false;
          console.log('Left key pressed');
        }
        if (key === 39 && !this.paused) {
          this.moveLeftDirection = false;
          this.moveRightDirection = true;
          console.log('Right key pressed');
        }
      }
    }
  }

  handleKeyUp(e) {
    const key = e.keyCode;
    if (key === 37 && !this.paused) {
      this.moveLeftDirection = false;
      this.moveRightDirection = false;
      console.log('Left key released');
    }
    if (key === 39 && !this.paused) {
      this.moveRightDirection = false;
      this.moveLeftDirection = false;
      console.log('Right key released');
    }
    this.keysAllowed[key] = true;
  }
}

class World {
  constructor() {
    this.element = document.getElementById('world');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.element.clientWidth / this.element.clientHeight,
      1,
      120000
    );
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    this.trackFloor = null;
    this.brain = null;
    this.paused = true;
    this.keysAllowed = {};
    this.gameOver = false;
    this.score = 0;
    this.difficulty = 0;
    this.fogDistance = 40000;
    this.character = null;
    this.mixer = null;

    this.init();
  }

  async init() {
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.element.appendChild(this.renderer.domElement);
    this.scene.fog = new THREE.Fog(0xbadbe4, 1, this.fogDistance);
    this.scene.background = new THREE.Color(0xa0a0a0);
    this.camera.position.set(0, 1500, -2000);
    this.camera.lookAt(new THREE.Vector3(0, 600, -5000));

    window.addEventListener(
      'resize',
      this.handleWindowResize.bind(this),
      false
    );

    this.scene.add(this.light);

    this.character = new Character();
    await this.character.loadCharacter(); // Дождитесь загрузки модели и анимаций
    if (
      this.character.character.animations &&
      this.character.character.animations.length > 0
    ) {
      this.character.playAnimation(this.character.character.animations, 'Run'); // Воспроизведите анимацию бега
      this.character.runAction = this.character.mixer.clipAction(
        this.character.character.animations[4]
      ); // Установите анимацию бега для runAction
    }
    this.character.character.scale.set(100, 100, 100);
    this.scene.add(this.character.element);

    this.trackFloor = await this.createModel(trackFloorUrl);
    this.trackFloor.position.set(0, 0, 0);
    this.scene.add(this.trackFloor);

    this.brain = await this.createModel(brainUrl);
    this.brain.position.set(0, 0, 0);
    this.scene.add(this.brain);

    this.keysAllowed = {};

    this.score = 0;
    this.difficulty = 0;
    document.getElementById('score').innerHTML = this.score;

    this.initEventListeners();

    this.loop();
  }

  loop() {
    if (!this.paused) {
      if (this.trackFloor.position.z % 3000 === 0) {
        this.difficulty += 1;
        const levelLength = 30;
        if (this.difficulty % levelLength === 0) {
          const level = this.difficulty / levelLength;
          switch (level) {
            case 1:
              break;
            // Добавьте дополнительные варианты для других уровней
          }
        }
        this.createRowOfModels(-120000);
        this.scene.fog.far = this.fogDistance;
      }

      this.updateModelPositions();
      this.character.update();

      if (this.collisionsDetected()) {
        this.gameOver = true;
        this.paused = true;
        document.addEventListener('keydown', e => {
          if (e.keyCode === 40) document.location.reload(true);
        });
        const variableContent = document.getElementById('variable-content');
        variableContent.style.visibility = 'visible';
        variableContent.innerHTML =
          'Game over! Press the down arrow to try again.';
      }
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop.bind(this));
  }

  handleWindowResize() {
    this.camera.aspect = this.element.clientWidth / this.element.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight);
  }

  async createModel(url) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        gltf => {
          const model = gltf.scene;
          this.scene.add(model);
          resolve(model);
        },
        undefined,
        reject
      );
    });
  }

  createRowOfModels(z) {
    let pos = -1800;
    while (pos < 1800) {
      this.createModel(brainUrl).then(model => {
        model.position.set(pos, 10, z);
        this.scene.add(model);
      });
      pos += Math.random() * 800 + 800;
    }
  }

  updateModelPositions() {
    this.scene.traverse(object => {
      if (
        object instanceof THREE.Mesh &&
        object !== this.trackFloor &&
        object !== this.brain &&
        object !== this.character.element
      ) {
        object.position.z += 100;
      }
    });
  }

  collisionsDetected() {
    if (!this.character || !this.character.element) {
      return false;
    }

    const charPos = this.character.element.position.clone();
    const charBox = new THREE.Box3().setFromObject(this.character.element);

    let collisionDetected = false;

    this.scene.traverse(object => {
      if (
        object instanceof THREE.Mesh &&
        object !== this.character.element &&
        object !== this.trackFloor &&
        object !== this.brain
      ) {
        const objPos = object.position.clone();
        const objBox = new THREE.Box3().setFromObject(object);
        if (charBox.intersectsBox(objBox)) {
          collisionDetected = true;
          return;
        }
      }
    });

    return collisionDetected;
  }

  initEventListeners() {
    document.addEventListener('keydown', this.character.handleKeyDown);
    document.addEventListener('keyup', this.character.handleKeyUp);
    window.addEventListener('focus', this.handleFocus);
  }

  handleFocus = e => {
    this.keysAllowed = {};
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const world = new World();
});
