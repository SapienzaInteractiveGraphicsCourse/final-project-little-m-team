import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"

function loadScene(){
    THREE.Cache.enabled = true;
    const loader = new THREE.ObjectLoader();
    loader.load(('../resources/scenes/scene.json'), function (scene) {init(scene)});
}

window.onload = loadScene();

class ShipController {
    constructor(shipObject) {
        this.ship = shipObject.getObjectByName("shipCam");
        this.light = shipObject.getObjectByName("shipLight");
        this.speed = 0;
        this.incline = 0;
        this.flip = 0;

        this.forward = shipObject.getWorldDirection();
        this.engine = false;
        this.light.intensity = 0;

        this.controls = {
            'speedUp': 38,      // UpArrow
            'speedDown': 40,    // DownArrow
            'turnLeft': 37,     // LeftArrow
            'turnRight': 39,    // RightArrow

            'inclineUp': 87,    // W
            'inclineDown': 83,  // S
            'flipLeft': 65,     // A
            'flip Riight': 68,  // D
            'engine': 16,       //ShiftRight
        };

        window.addEventListener('keydown', (e) => {
            switch(e.keyCode){
                case (this.controls['speedUp']):
                    if (this.engine && this.speed <0.2) this.speed += 0.05;
                    console.log(this.speed);
                break;
                case (this.controls['speedDown']):
                    if (this.engine && this.speed >-0.2) this.speed -= 0.05;
                    console.log(this.speed);
                break;
                case (this.controls['inclineUp']):
                    this.incline += 1;
                    console.log(this.incline);
                break;
                case (this.controls['inclineDown']):
                    this.incline -= 1;
                    console.log(this.incline);
                break;

                case (this.controls['flipLeft']):
                    this.flip -= 1;
                    console.log(this.flip);
                break;
                case (this.controls['flipRight']):
                    this.flip +=1;
                    console.log(this.flip);
                break;
                case this.controls['engine']:
                    this.engine = !this.engine;
                    this.speed = 0;
                    this.light.intensity = this.engine;
                    console.log(this.engine);
                break;
                default:
                    console.log(e.keyCode);
            }
        });
    }


    update(){
        if (this.engine){
            this.light.intensity = 1 + Math.abs(this.speed)*10;
            this.ship.translateOnAxis(this.forward.normalize(), this.speed);
        }
    }

};


function init(scene){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const camera = scene.getObjectByName("shipCam");
    camera.position.set(0,0,15);
    camera.lookAt(0,0,0);
    const controls = new OrbitControls(camera, canvas);
    controls.update();
    const controller = new ShipController(camera);
    console.log(controller.ship)
    modifyScene();


    function modifyScene(){
        scene.getObjectByName("greenLight").intensity = 500;
        scene.getObjectByName("redLight").intensity = 500;

    }

    render();

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
