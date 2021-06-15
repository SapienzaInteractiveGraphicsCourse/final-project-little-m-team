import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"

class ShipController {
    constructor(shipObject) {
        this.ship = shipObject.getObjectByName("shipCam");
        this.light = shipObject.getObjectByName("shipLight");
        this.speed = 0;
        this.incline = 0;
        this.flip = 0;
        this.forward = shipObject.getWorldDirection();
        console.log(this.forward);
        this.controls = {
            38: 'speedUp',      // Up   Arrow
            40: 'speedDown',    // Down Arrow
            37: 'turnLeft',     // Left Arrow
            39: 'turnRight',    // Right Arrow

            87: 'inclineUp',    // W
            83: 'inclineDown',  // S
            65: 'flipLeft',     // A
            68: 'flip Riight',  // D
        };
    }

    update(){
        console.log(this.speed,this.incline,this.flip)
        //this.ship.translateOnAxis(this.forward.normalize(), this.speed);
    }
};

window.onload = function init(){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    aspect = canvas.width/canvas.height;
    let scene, camera, controls, controller;

    THREE.Cache.enabled = true;
    const loader = new THREE.ObjectLoader();
    loader.load(('../resources/scenes/scene.json'), function ( data ) {
        scene = data;
        camera = scene.getObjectByName("shipCam");
        controls = new OrbitControls(camera, canvas);
        controls.update();
        scene.getObjectByName("greenLight").intensity = 500;
        scene.getObjectByName("redLight").intensity = 500;
        scene.getObjectByName("shipCam").position.set(8, -3,-5);
        controller = new ShipController(scene.getObjectByName("shipCam"));

        canvas.addEventListener('keydown', (e) => {

            switch(e.keycode){
                case (controller.controls['speedUp']):
                controller.speed += 0.1;
                break;
                case (controller.controls['speedDown']):
                controller.speed -= 0.1;
                break;
                case (controller.controls['inclineUp']):
                controller.incline += 1;
                break;
                case (controller.controls['inclineDown']):
                controller.incline -= 1;
                break;

                case (controller.controls['flipLeft']):
                controller.flip -= 1;
                break;
                case (controller.controls['flipRight']):
                controller.flip +=1;
                break;
                default: console.log(e.keycode);
                break;
            }
        });
        render();
	});


    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        //orbits(time*0.001);
        controller.update()
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    function orbits(t){
        scene.getObjectByName("Stars").rotation.y = t*0.1;
        scene.getObjectByName("ZigarovPlanet").rotation.y = -t*0.01;
        scene.getObjectByName("Universe").rotation.x = t*0.001;
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
