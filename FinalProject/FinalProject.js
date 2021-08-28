import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"
import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"
import {Player} from "./Player.js"

window.addEventListener('resize', onWindowResize);
window.onload = loadScene();

function onWindowResize() {
  camera.aspect = width / height;;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height)
}

function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('scenes/scene.json'), function (scene) {init(scene)});
    //loader.load(('scenes/PlanetSystem.json'), function (scene) {init(scene)});
    //loader.load(('scenes/CharacterAnimation.json'), function (scene) {init(scene)});

}

function init(scene){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; //THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const loader = new THREE.ObjectLoader();

    // const objects = [
    //     'scenes/PlanetSystem.json',
    //     'myModels/Astronaut.json'
    // ];
    // objects.forEach((path) => {
    //     loader.load((path), function(obj){scene.add(obj);
    //     console.log(obj.name)});
    // });

    // const camera = new THREE.PerspectiveCamera( 50, canvas.width / canvas.height, 0.01, 1000);
    // camera.position.set(0,11,3);
    // camera.rotateX(-0.2);
    // scene.add(camera);

    const camera = scene.getObjectByName("PlayerCam");

    const lights = [
        scene.getObjectByName("star1Light"),
        scene.getObjectByName("star2Light"),
        scene.getObjectByName("lightEye")
    ];

    const astronaut = scene.getObjectByName("Astronaut");
    const lightTarget = new THREE.Object3D();
    astronaut.getObjectByName("Head").add(lightTarget);
    lightTarget.position.set(0,0.2,1);
    astronaut.getObjectByName("lightEye").target = lightTarget;
    const player = new Player(astronaut);
    // document.getElementById("StartButton").onclick = function() {player.move()};
    // document.getElementById("StopButton").onclick = function() {player.reset()};

    window.addEventListener('keydown', (e) => {
        switch(e.code){
            case "KeyW":
                player.move();
            break;
            case "KeyA":
                player.turn = 'left';
            break;
            case "KeyD":
                player.turn = 'right';
            break;
        }
    });

    window.addEventListener('keyup', (e) => {
        switch(e.code){
            case "KeyW":
                player.reset();
            break;
            case "KeyA":
                player.turn = 'straight';
            break;
            case "KeyD":
                player.turn = 'straight';
            break;
        }
    });

    guiOptions();
    render();

    function render(time) {
        requestAnimationFrame(render);
        player.update();
        //orbits();
        renderer.render(scene, camera);

    }

    function orbits(t){
        scene.getObjectByName("Stars").rotateY(0.001);
        scene.getObjectByName("Universe").rotateX(-0.0005);
        const planet = scene.getObjectByName('Planet');
        const [moving, direction] = player.moving;
        if(moving){
            planet.rotation.y +=(direction * 0.025);
            const theta = planet.rotation.y;
            console.log(theta)
            let w = new THREE.Vector3(Math.sin(theta),0,Math.cos(theta));
            planet.rotateOnAxis(w,0.001);
        }

    }

    function guiOptions(){
        const gui = new GUI();
        const camFolder = gui.addFolder('Camera');
        camFolder.add(camera, 'fov', 30, 120);

        const lightsFolder = gui.addFolder("Lights");
        lights.forEach(light => {
            const lightFolder = lightsFolder.addFolder(light.name);
            lightFolder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
            lightFolder.add(light, 'intensity', 0, 1000);
            lightFolder.add(light, 'distance', 0, 1000);
            lightFolder.add(light, 'decay', 0, 2);
            if (light.name == 'lightEye') {
                //lightFolder.add(light, 'angle', 0, 1.57);
                //lightFolder.add(light, 'penumbra', 0, 1);
                const targetFolder = lightFolder.addFolder("Target");
                targetFolder.add(lightTarget.position, 'x', 0,10);
                targetFolder.add(lightTarget.position, 'y', 0,10);
                targetFolder.add(lightTarget.position, 'z', 0,10);
            }
        });
    }
}

class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}
