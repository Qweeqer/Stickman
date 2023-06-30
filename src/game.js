import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  loadModels,
  updateAnimation,
  stickmanUrl,
  trackFloorUrl,
  brainUrl,
} from './mesh/models.js';
var Colors = {
  cherry: 0xe35d6a,
  blue: 0x1560bd,
  white: 0xd8d0d1,
  black: 0x000000,
  brown: 0x59332e,
  peach: 0xffdab9,
  yellow: 0xffff00,
  olive: 0x556b2f,
  grey: 0x696969,
  sand: 0xc2b280,
  brownDark: 0x23190f,
  green: 0x669900,
};

var deg2Rad = Math.PI / 180;

// window.addEventListener('load', function () {
//   setTimeout(function () {
//     new World();
//   }, 0);
// });


function World() {
  var self = this;
  var element,
    scene,
    camera,
    character,
    renderer,
    light,
    trackFloor,
    brain,
    mixer,
    paused,
    keysAllowed,
    score,
    difficulty,
    fogDistance,
    gameOver;

  init();

  function init() {
    element = document.getElementById('world');

    var variableContent = document.createElement('div');
    variableContent.className = 'animate-flicker';
    variableContent.id = 'variable-content';
    element.appendChild(variableContent);

    

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(element.clientWidth, element.clientHeight);
    renderer.shadowMap.enabled = true;
    element.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    fogDistance = 40000;
    scene.fog = new THREE.Fog(0xbadbe4, 1, fogDistance);

    camera = new THREE.PerspectiveCamera(
      60,
      element.clientWidth / element.clientHeight,
      1,
      120000
    );
    camera.position.set(0, 1500, -2000);
    camera.lookAt(new THREE.Vector3(0, 600, -5000));
    window.camera = camera;

    window.addEventListener('resize', handleWindowResize, false);

    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(light);

    character = new Character();
    scene.add(character.element);

   trackFloor = createModel(trackFloorUrl, scene);
    trackFloor.position.set(0, 0, 0);
    scene.add(trackFloor);

    brain = createModel(brainUrl);
    brain.position.set(0, 0, 0);
    scene.add(brain);

    gameOver = false;
    paused = true;

    var left = 37;
    var up = 38;
    var right = 39;
    var p = 80;

    keysAllowed = {};
    document.addEventListener('keydown', function (e) {
      if (!gameOver) {
        var key = e.keyCode;
        if (keysAllowed[key] === false) return;
        keysAllowed[key] = false;
        if (paused && !collisionsDetected() && key > 18) {
          paused = false;
          character.onUnpause();
          document.getElementById('variable-content').style.visibility =
            'hidden';
          document.getElementById('controls').style.display = 'none';
        } else {
          if (key == p) {
            paused = true;
            character.onPause();
            document.getElementById('variable-content').style.visibility =
              'visible';
            document.getElementById('variable-content').innerHTML =
              'Game is paused. Press any key to resume.';
          }
          if (key == up && !paused) {
            character.onUpKeyPressed();
          }
          if (key == left && !paused) {
            character.onLeftKeyPressed();
            console.log('Left key pressed');
          }
          if (key == right && !paused) {
            character.onRightKeyPressed();
            console.log('Right key pressed');
          }
        }
      }
    });

    document.addEventListener('keyup', function (e) {
      keysAllowed[e.keyCode] = true;
    });

    document.addEventListener('focus', function (e) {
      keysAllowed = {};
    });

    score = 0;
    difficulty = 0;
    document.getElementById('score').innerHTML = score;

    loop();
  }

  function loop() {
    if (!paused) {
      if (trackFloor.position.z % 3000 == 0) {
        difficulty += 1;
        var levelLength = 30;
        if (difficulty % levelLength == 0) {
          var level = difficulty / levelLength;
          switch (level) {
            case 1:
              break;
            // Add additional cases for different levels
          }
        }
        createRowOfModels(-120000);
        scene.fog.far = fogDistance;
      }

      updateModelPositions();
      character.update();

      if (collisionsDetected()) {
        gameOver = true;
        paused = true;
        document.addEventListener('keydown', function (e) {
          if (e.keyCode == 40) document.location.reload(true);
        });
        var variableContent = document.getElementById('variable-content');
        variableContent.style.visibility = 'visible';
        variableContent.innerHTML =
          'Game over! Press the down arrow to try again.';
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  function handleWindowResize() {
    camera.aspect = element.clientWidth / element.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(element.clientWidth, element.clientHeight);
  }

  function createRowOfModels(z) {
    var pos = -1800;
    while (pos < 1800) {
      var model = createModel(brainUrl);
      model.position.set(pos, 10, z);
      scene.add(model);
      pos += Math.random() * 800 + 800;
    }
  }

  function updateModelPositions() {
    scene.traverse(function (object) {
      if (
        object instanceof THREE.Mesh &&
        object !== trackFloor &&
        object !== brain
      ) {
        object.position.z += 100;
      }
    });
  }

  function collisionsDetected() {
    var charPos = character.element.position.clone();
    var charBox = new THREE.Box3().setFromObject(character.element);

    var collisionDetected = false;

    scene.traverse(function (object) {
      if (
        object instanceof THREE.Mesh &&
        object !== character.element &&
        object !== trackFloor &&
        object !== brain
      ) {
        var objPos = object.position.clone();
        var objBox = new THREE.Box3().setFromObject(object);
        if (charBox.intersectsBox(objBox)) {
          collisionDetected = true;
          return;
        }
      }
    });

    return collisionDetected;
  }

function createModel(url) {
  var loader = new GLTFLoader();
  var model;

  loader.load(url, function (gltf) {
    model = gltf.scene;
    scene.add(model);
  });

  return model;
}


  function Character() {
    // Character implementation
  }
}

// new World();
