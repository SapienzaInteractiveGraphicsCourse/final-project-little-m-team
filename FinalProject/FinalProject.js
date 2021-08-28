import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"
import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"
import {Player} from "./Player.js"

window.onload = init();

function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('scenes/PlanetSystem.json'), function (scene) {init(scene)});
    //loader.load(('scenes/CharacterAnimation.json'), function (scene) {init(scene)});

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

function init(){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; //THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const scene = new THREE.Scene();
    let lights;
    const loader = new THREE.ObjectLoader();

    loader.load(('scenes/PlanetSystem.json'), setScene(obj););

    function setScene(obj){
        scene.add(obj);
    }

    // const camera = new THREE.PerspectiveCamera( 50, canvas.width / canvas.height, 0.01, 1000);
    // camera.position.set(0,11,3);
    // camera.rotateX(-0.2);
    // scene.add(camera);
    //
    // const light = new THREE.PointLight();
    // light.position.set(0, 10, 1);
    // scene.add(light);
    // scene.getObjectByName("Astronaut").position.set(0,10.5,0)

    const player = new Player(scene.getObjectByName("Astronaut"))
    document.getElementById("StartButton").onclick = function() {player.move()};
    document.getElementById("StopButton").onclick = function() {player.reset()};

    const camera = scene.getObjectByName("PlayerCam");

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
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        /*
        orbits(time*0.001);
        camera.updateProjectionMatrix();
        var cast = new Array();
        scene.getObjectByName("PlanetZigarov").raycast(player.ray,cast);
        //if (cast.length >0) console.log(cast[0].distance.toPrecision(3));
        player.update(cast[0]);
        */
        //clip.Update(time);
        player.update();
        orbits(time);
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
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
}
