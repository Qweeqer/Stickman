!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},r=t.parcelRequire4249;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return i[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequire4249=r);var s=r("bpxeT"),o=r("8MBJY"),a=r("a2hTj"),c=r("hKHmD"),h=r("2TvXO"),l=r("6OvZu"),d=r("53OwP"),u=r("fU8Qh"),m=function(){"use strict";function t(){e(o)(this,t),this.keysAllowed={},this.element=new l.Group,this.mixer=null,this.character=null,this.characterURL=u.stickmanUrl,this.isRunning=!1,this.runAction=null,this.moveLeftDirection=!1,this.moveRightDirection=!1,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}return e(a)(t,[{key:"loadCharacter",value:function(){var e=this;return new Promise((function(t,i){var n=e;(new(0,d.GLTFLoader)).load(e.characterURL,(function(e){n.character=e.scene,n.mixer=new l.AnimationMixer(n.character),n.character.animations&&n.character.animations.length>0&&(n.playAnimation(n.character.animations,"Run"),n.runAction=n.mixer.clipAction(n.character.animations[4])),t()}),void 0,i)}))}},{key:"playAnimation",value:function(e,t){if(e&&e.length>0){var i=l.AnimationClip.findByName(e,t);if(i)this.mixer.clipAction(i).play()}}},{key:"update",value:function(){this.mixer&&this.mixer.update(.01),this.isRunning&&this.moveForward(),this.moveLeftDirection&&this.moveLeft(),this.moveRightDirection&&this.moveRight()}},{key:"onUpKeyPressed",value:function(){this.isRunning=!0,this.runAction&&(this.mixer.stopAllAction(),this.runAction.reset(),this.runAction.play())}},{key:"onLeftKeyPressed",value:function(){this.moveLeftDirection=!0,this.moveRightDirection=!1}},{key:"onRightKeyPressed",value:function(){this.moveLeftDirection=!1,this.moveRightDirection=!0}},{key:"moveForward",value:function(){this.element.position.z-=3,this.onUpKeyPressed()}},{key:"moveLeft",value:function(){this.element.position.x>-3&&(this.element.position.x-=1)}},{key:"moveRight",value:function(){this.element.position.x<3&&(this.element.position.x+=1)}},{key:"onUnpause",value:function(){}},{key:"onPause",value:function(){}},{key:"handleKeyDown",value:function(e){if(!this.gameOver){var t=e.keyCode;if(!1===this.keysAllowed[t])return;this.keysAllowed[t]=!1,this.paused&&!this.collisionsDetected()&&t>18?(this.paused=!1,this.character.onUnpause(),document.getElementById("variable-content").style.visibility="hidden",document.getElementById("controls").style.display="none"):(80===t&&(this.paused=!0,this.onPause(),document.getElementById("variable-content").style.visibility="visible",document.getElementById("variable-content").innerHTML="Game is paused. Press any key to resume."),38!==t||this.paused||(this.onUpKeyPressed(),console.log("Up key pressed")),37!==t||this.paused||(this.moveLeftDirection=!0,this.moveRightDirection=!1,console.log("Left key pressed")),39!==t||this.paused||(this.moveLeftDirection=!1,this.moveRightDirection=!0,console.log("Right key pressed")))}}},{key:"handleKeyUp",value:function(e){var t=e.keyCode;37!==t||this.paused||(this.moveLeftDirection=!1,this.moveRightDirection=!1,console.log("Left key released")),39!==t||this.paused||(this.moveRightDirection=!1,this.moveLeftDirection=!1,console.log("Right key released")),this.keysAllowed[t]=!0}}]),t}(),f=function(){"use strict";function t(){var i=this;e(o)(this,t),e(c)(this,"handleFocus",(function(e){i.keysAllowed={}})),this.element=document.getElementById("world"),this.scene=new l.Scene,this.camera=new l.PerspectiveCamera(60,this.element.clientWidth/this.element.clientHeight,1,12e4),this.renderer=new l.WebGLRenderer({alpha:!0,antialias:!0}),this.light=new l.HemisphereLight(16777215,16777215,1),this.trackFloor=null,this.brain=null,this.paused=!0,this.keysAllowed={},this.gameOver=!1,this.score=0,this.difficulty=0,this.fogDistance=4e4,this.character=null,this.mixer=null,this.init()}return e(a)(t,[{key:"init",value:function(){var t=this;return e(s)(e(h).mark((function i(){return e(h).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.renderer.setSize(t.element.clientWidth,t.element.clientHeight),t.renderer.shadowMap.enabled=!0,t.element.appendChild(t.renderer.domElement),t.scene.fog=new l.Fog(12245988,1,t.fogDistance),t.scene.background=new l.Color(10526880),t.camera.position.set(0,1500,-2e3),t.camera.lookAt(new l.Vector3(0,600,-5e3)),window.addEventListener("resize",t.handleWindowResize.bind(t),!1),t.scene.add(t.light),t.character=new m,e.next=12,t.character.loadCharacter();case 12:return t.character.character.animations&&t.character.character.animations.length>0&&(t.character.playAnimation(t.character.character.animations,"Run"),t.character.runAction=t.character.mixer.clipAction(t.character.character.animations[4])),t.character.character.scale.set(100,100,100),t.scene.add(t.character.element),e.next=17,t.createModel(u.trackFloorUrl);case 17:return t.trackFloor=e.sent,t.trackFloor.position.set(0,0,0),t.scene.add(t.trackFloor),e.next=22,t.createModel(u.brainUrl);case 22:t.brain=e.sent,t.brain.position.set(0,0,0),t.scene.add(t.brain),t.keysAllowed={},t.score=0,t.difficulty=0,document.getElementById("score").innerHTML=t.score,t.initEventListeners(),t.loop();case 31:case"end":return e.stop()}}),i)})))()}},{key:"loop",value:function(){if(!this.paused){if(this.trackFloor.position.z%3e3==0){this.difficulty+=1;if(this.difficulty%30==0)this.difficulty;this.createRowOfModels(-12e4),this.scene.fog.far=this.fogDistance}if(this.updateModelPositions(),this.character.update(),this.collisionsDetected()){this.gameOver=!0,this.paused=!0,document.addEventListener("keydown",(function(e){40===e.keyCode&&document.location.reload(!0)}));var e=document.getElementById("variable-content");e.style.visibility="visible",e.innerHTML="Game over! Press the down arrow to try again."}}this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.loop.bind(this))}},{key:"handleWindowResize",value:function(){this.camera.aspect=this.element.clientWidth/this.element.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.element.clientWidth,this.element.clientHeight)}},{key:"createModel",value:function(t){var i=this;return e(s)(e(h).mark((function n(){var r;return e(h).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new(0,d.GLTFLoader),e.abrupt("return",new Promise((function(e,n){r.load(t,(function(t){var n=t.scene;i.scene.add(n),e(n)}),void 0,n)})));case 2:case"end":return e.stop()}}),n)})))()}},{key:"createRowOfModels",value:function(e){for(var t=-1800;t<1800;){var i=this;this.createModel(u.brainUrl).then((function(n){n.position.set(t,10,e),i.scene.add(n)})),t+=800*Math.random()+800}}},{key:"updateModelPositions",value:function(){var e=this;this.scene.traverse((function(t){t instanceof l.Mesh&&t!==e.trackFloor&&t!==e.brain&&t!==e.character.element&&(t.position.z+=100)}))}},{key:"collisionsDetected",value:function(){var e=this;if(!this.character||!this.character.element)return!1;this.character.element.position.clone();var t=(new l.Box3).setFromObject(this.character.element),i=!1;return this.scene.traverse((function(n){if(n instanceof l.Mesh&&n!==e.character.element&&n!==e.trackFloor&&n!==e.brain){n.position.clone();var r=(new l.Box3).setFromObject(n);if(t.intersectsBox(r))return void(i=!0)}})),i}},{key:"initEventListeners",value:function(){document.addEventListener("keydown",this.character.handleKeyDown),document.addEventListener("keyup",this.character.handleKeyUp),window.addEventListener("focus",this.handleFocus)}}]),t}();window.addEventListener("DOMContentLoaded",(function(){new f}))}();
//# sourceMappingURL=index.37629986.js.map
