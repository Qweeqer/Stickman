var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},s=e.parcelRequire4249;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var s=i[e];delete i[e];var n={id:e,exports:{}};return t[e]=n,s.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},e.parcelRequire4249=s);var n=s("eq1Fs"),o=s("kXZ5p"),r=s("l5XAj");class h{constructor(){this.keysAllowed={},this.element=new n.Group,this.mixer=null,this.character=null,this.characterURL=r.stickmanUrl,this.isRunning=!1,this.runAction=null,this.moveLeftDirection=!1,this.moveRightDirection=!1,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}loadCharacter(){return new Promise(((e,t)=>{(new(0,o.GLTFLoader)).load(this.characterURL,(t=>{this.character=t.scene,this.mixer=new n.AnimationMixer(this.character),this.character.animations&&this.character.animations.length>0&&(this.playAnimation(this.character.animations,"Run"),this.runAction=this.mixer.clipAction(this.character.animations[4])),e()}),void 0,t)}))}playAnimation(e,t){if(e&&e.length>0){const i=n.AnimationClip.findByName(e,t);if(i){this.mixer.clipAction(i).play()}}}update(){this.mixer&&this.mixer.update(.01),this.isRunning&&this.moveForward(),this.moveLeftDirection&&this.moveLeft(),this.moveRightDirection&&this.moveRight()}onUpKeyPressed(){this.isRunning=!0,this.runAction&&(this.mixer.stopAllAction(),this.runAction.reset(),this.runAction.play())}onLeftKeyPressed(){this.moveLeftDirection=!0,this.moveRightDirection=!1}onRightKeyPressed(){this.moveLeftDirection=!1,this.moveRightDirection=!0}moveForward(){this.element.position.z-=3,this.onUpKeyPressed()}moveLeft(){this.element.position.x>-3&&(this.element.position.x-=1)}moveRight(){this.element.position.x<3&&(this.element.position.x+=1)}onUnpause(){}onPause(){}handleKeyDown(e){if(!this.gameOver){const t=e.keyCode;if(!1===this.keysAllowed[t])return;this.keysAllowed[t]=!1,this.paused&&!this.collisionsDetected()&&t>18?(this.paused=!1,this.character.onUnpause(),document.getElementById("variable-content").style.visibility="hidden",document.getElementById("controls").style.display="none"):(80===t&&(this.paused=!0,this.onPause(),document.getElementById("variable-content").style.visibility="visible",document.getElementById("variable-content").innerHTML="Game is paused. Press any key to resume."),38!==t||this.paused||(this.onUpKeyPressed(),console.log("Up key pressed")),37!==t||this.paused||(this.moveLeftDirection=!0,this.moveRightDirection=!1,console.log("Left key pressed")),39!==t||this.paused||(this.moveLeftDirection=!1,this.moveRightDirection=!0,console.log("Right key pressed")))}}handleKeyUp(e){const t=e.keyCode;37!==t||this.paused||(this.moveLeftDirection=!1,this.moveRightDirection=!1,console.log("Left key released")),39!==t||this.paused||(this.moveRightDirection=!1,this.moveLeftDirection=!1,console.log("Right key released")),this.keysAllowed[t]=!0}}class a{constructor(){this.element=document.getElementById("world"),this.scene=new n.Scene,this.camera=new n.PerspectiveCamera(60,this.element.clientWidth/this.element.clientHeight,1,12e4),this.renderer=new n.WebGLRenderer({alpha:!0,antialias:!0}),this.light=new n.HemisphereLight(16777215,16777215,1),this.trackFloor=null,this.brain=null,this.paused=!0,this.keysAllowed={},this.gameOver=!1,this.score=0,this.difficulty=0,this.fogDistance=4e4,this.character=null,this.mixer=null,this.init()}async init(){this.renderer.setSize(this.element.clientWidth,this.element.clientHeight),this.renderer.shadowMap.enabled=!0,this.element.appendChild(this.renderer.domElement),this.scene.fog=new n.Fog(12245988,1,this.fogDistance),this.scene.background=new n.Color(10526880),this.camera.position.set(0,1500,-2e3),this.camera.lookAt(new n.Vector3(0,600,-5e3)),window.addEventListener("resize",this.handleWindowResize.bind(this),!1),this.scene.add(this.light),this.character=new h,await this.character.loadCharacter(),this.character.character.animations&&this.character.character.animations.length>0&&(this.character.playAnimation(this.character.character.animations,"Run"),this.character.runAction=this.character.mixer.clipAction(this.character.character.animations[4])),this.character.character.scale.set(100,100,100),this.scene.add(this.character.element),this.trackFloor=await this.createModel(r.trackFloorUrl),this.trackFloor.position.set(0,0,0),this.scene.add(this.trackFloor),this.brain=await this.createModel(r.brainUrl),this.brain.position.set(0,0,0),this.scene.add(this.brain),this.keysAllowed={},this.score=0,this.difficulty=0,document.getElementById("score").innerHTML=this.score,this.initEventListeners(),this.loop()}loop(){if(!this.paused){if(this.trackFloor.position.z%3e3==0){this.difficulty+=1;const e=30;if(this.difficulty%e==0){this.difficulty}this.createRowOfModels(-12e4),this.scene.fog.far=this.fogDistance}if(this.updateModelPositions(),this.character.update(),this.collisionsDetected()){this.gameOver=!0,this.paused=!0,document.addEventListener("keydown",(e=>{40===e.keyCode&&document.location.reload(!0)}));const e=document.getElementById("variable-content");e.style.visibility="visible",e.innerHTML="Game over! Press the down arrow to try again."}}this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.loop.bind(this))}handleWindowResize(){this.camera.aspect=this.element.clientWidth/this.element.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.element.clientWidth,this.element.clientHeight)}async createModel(e){const t=new(0,o.GLTFLoader);return new Promise(((i,s)=>{t.load(e,(e=>{const t=e.scene;this.scene.add(t),i(t)}),void 0,s)}))}createRowOfModels(e){let t=-1800;for(;t<1800;)this.createModel(r.brainUrl).then((i=>{i.position.set(t,10,e),this.scene.add(i)})),t+=800*Math.random()+800}updateModelPositions(){this.scene.traverse((e=>{e instanceof n.Mesh&&e!==this.trackFloor&&e!==this.brain&&e!==this.character.element&&(e.position.z+=100)}))}collisionsDetected(){if(!this.character||!this.character.element)return!1;this.character.element.position.clone();const e=(new n.Box3).setFromObject(this.character.element);let t=!1;return this.scene.traverse((i=>{if(i instanceof n.Mesh&&i!==this.character.element&&i!==this.trackFloor&&i!==this.brain){i.position.clone();const s=(new n.Box3).setFromObject(i);if(e.intersectsBox(s))return void(t=!0)}})),t}initEventListeners(){document.addEventListener("keydown",this.character.handleKeyDown),document.addEventListener("keyup",this.character.handleKeyUp),window.addEventListener("focus",this.handleFocus)}handleFocus=e=>{this.keysAllowed={}}}window.addEventListener("DOMContentLoaded",(()=>{new a}));
//# sourceMappingURL=index.f50b2148.js.map
