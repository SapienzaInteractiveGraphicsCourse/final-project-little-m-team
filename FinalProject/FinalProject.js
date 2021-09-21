import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"
import {TWEEN} from "../resources/three/examples/jsm/libs/tween.module.min.js"
import {Player} from "./Player.js"

window.onload = loadScene();


function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('scenes/scene.json'), function (scene) {init(scene)});
    //loader.load(('scenes/PlanetSystem.json'), function (scene) {init(scene)});
    //loader.load(('scenes/CharacterAnimation.json'), function (scene) {init(scene)});

}

function init(scene){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid white";

    // canvas.width  = 1024;
    // canvas.height = 576;

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
    window.addEventListener('resize', resize);

    const lights = [
        scene.getObjectByName("star1Light"),
        scene.getObjectByName("star2Light"),
        scene.getObjectByName("lightEye")
    ];

    const dirX = new THREE.Vector3( 1, 0, 0 );
    const dirY = new THREE.Vector3( 0, 1, 0 );
    const dirZ = new THREE.Vector3( 0, 0, 1 );

    const astronaut = scene.getObjectByName("Astronaut");

    const lightTarget = new THREE.Object3D();
    astronaut.getObjectByName("Head").add(lightTarget);
    lightTarget.position.set(0,0.2,1);
    astronaut.getObjectByName("lightEye").target = lightTarget;
    //astronaut.lookAt(0,0,0);
    //astronaut.rotation.x -= Math.PI/2;

    const player = new Player(astronaut);




    const origin = new THREE.Vector3(1, 11, 0);
    const length = 0.5;
    const hex = 0xffffff;

    const arrowHelpers = [
        new THREE.ArrowHelper( dirX, origin, length, hex ),
        new THREE.ArrowHelper( dirY, origin, length, hex ),
        new THREE.ArrowHelper( dirZ, origin, length, hex )
    ];
    arrowHelpers.forEach((arrow) => {scene.add(arrow);});

    let f = new THREE.Vector3(0,0,1);

    const object = scene.getObjectByName("Box");
    object.scale.set(0.05,0.05,0.05);
    let spherical =
    object.position.setFromSpherical(new THREE.Spherical(1.02, -0.2, 0));
    object.lookAt(0,0,0);

    guiOptions();
    render();

    function render() {
        requestAnimationFrame(render);
        camera.updateProjectionMatrix();
        player.update();
        orbits();
        renderer.render(scene, camera);

    }

    function orbits(t){
        scene.getObjectByName("Stars").rotateY(0.005);
        scene.getObjectByName("Universe").rotateX(-0.0005);
    }

    function guiOptions(){
        const gui = new GUI();

        const camFolder = gui.addFolder('PlayerCam');
        camFolder.add(camera, 'fov', 30, 90);
        camFolder.add(camera.position, 'y', 0, 10);
        camFolder.add(camera.position, 'z', -5, 5);
        camFolder.add(camera.rotation, 'x', -Math.PI, -Math.PI/2);

        const lightsFolder = gui.addFolder("Lights");
        lights.forEach(light => {
            const lightFolder = lightsFolder.addFolder(light.name);
            lightFolder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
            lightFolder.add(light, 'intensity', 0, 1000);
            lightFolder.add(light, 'distance', 0, 1000);
            lightFolder.add(light, 'decay', 0, 2);
            if (light.name == 'lightEye') {
                lightFolder.add(light, 'angle', 0, 1.57);
                lightFolder.add(light, 'penumbra', 0, 1);
                const targetFolder = lightFolder.addFolder("Target");
                targetFolder.add(lightTarget.position, 'x', 0,10);
                targetFolder.add(lightTarget.position, 'y', 0,10);
                targetFolder.add(lightTarget.position, 'z', 0,10);
            }
        });
    }

    function resize() {
        var factor = 0.9; // percentage of the screen
        var w = window.innerWidth * factor;
        var h = window.innerHeight * factor;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };
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
