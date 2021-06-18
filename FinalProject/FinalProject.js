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
            this.ship = shipObject.getObjectByName("ship");
            this.cam = shipObject.getObjectByName("shipCam");
            this.light = shipObject.getObjectByName("shipLight");
            this.gear = 4;
            this.speed = [-0.2, -0.1, -0.05, -0.01, 0, 0.01, 0.05, 0.1, 0.2];
            this.incline = 0;
            this.flip = 0;
            this.engine = false;
            this.pov = true;
            this.light.intensity = 0;
            this.ship.position.set(0,-1,-2);
            this.forward = new THREE.Vector3();
            shipObject.getWorldDirection(this.forward);
            console.log(this.forward);
            this.forward = this.forward.normalize();

            let x = this.forward.clone();
            x.cross(this.cam.up);
            this.cross = x.normalize();

            this.controls = {
                'speedUp': 38,      // UpArrow
                'speedDown': 40,    // DownArrow
                'turnLeft': 37,     // LeftArrow
                'turnRight': 39,    // RightArrow

                'inclineUp': 87,    // W
                'inclineDown': 83,  // S
                'flipLeft': 65,     // A
                'flipRight': 68,    // D
                'engine': 16,       //ShiftRight
                'reset': 8,
            };

            window.addEventListener('keydown', (e) => {
                switch(e.keyCode){
                    case (this.controls['speedUp']):
                        if (this.engine && this.speed[this.gear] < 0.2) this.gear +=1;
                    break;
                    case (this.controls['speedDown']):
                        if (this.engine && this.gear > 0) this.gear --;
                        console.log(this.speed[this.gear]);
                    break;
                    case (this.controls['inclineUp']):
                        if (this.engine) this.cam.rotateOnAxis(this.cross, 0.02);
                    break;
                    case (this.controls['inclineDown']):
                        if (this.engine) this.cam.rotateOnAxis(this.cross, -0.02);
                    break;

                    case (this.controls['flipLeft']):
                        if (this.engine) {
                            this.cam.rotateOnAxis(this.forward, -0.05);
                            this.cam.updateProjectionMatrix();
                        }


                    break;
                    case (this.controls['flipRight']):
                        if (this.engine) this.cam.rotateZ(-0.05);
                    break;
                    case this.controls['engine']:
                        this.engine = !this.engine;
                        this.gear = 4;
                        this.light.intensity = this.engine;
                        console.log(this.engine);
                    break;
                    case this.controls['reset']:
                        this.cam.lookAt(0,0,0);
                    case 86:
                        this.switchPOV();
                    break;
                    case 32:
                        this.landing();
                    break;
                    default:
                        console.log(e.keyCode);
                }
            });
        }


        update(){
            if (this.engine){
                this.light.intensity = (1 + Math.abs(this.speed[this.gear])*10);
                this.cam.translateOnAxis(this.forward, this.speed[this.gear]);
            }
        }

        landing(){
            let p = new THREE.Vector3();
            this.cam.getWorldDirection(this.forward);
            this.cam.getWorldPosition(p);
            p.negate().normalize();
            const phi = p.angleTo(this.forward);
            const w = new THREE.Vector3().crossVectors(this.forward,p);
            this.cam.rotateOnAxis(w, phi)
            this.switchPOV();

        //    const theta = p.angleTo(this.up)


            //console.log(w)
        }

        switchPOV(){

            if (this.pov){
                this.ship.rotateX(-1.57);
                this.ship.translateY(-1);
            }
            else {
                this.ship.translateY(1);
                this.ship.rotateX(1.57);
            }
            this.pov = !this.pov;
        }
    };
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


function init(scene){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const camera = scene.getObjectByName("shipCam");
    camera.position.set(0,0,20);
    camera.lookAt(0,0,0);
    const controller = new ShipController(camera);
    const lights = [scene.getObjectByName("redLight"), scene.getObjectByName("greenLight"), scene.getObjectByName("ambientLight")];
    lights[2].visible = true;
    modifyScene();
    options();
    //controller.landing();
    render();

    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        orbits(time*0.001);
        camera.updateProjectionMatrix();
        controller.update();

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    function modifyScene(){
        lights.forEach(light => {
            light.power = 5000;
            light.decay = 1;
            light.distance = Infinity;
        });
        scene.getObjectByName("ZigarovPlanet").scale.set(10,10,10);

    }

    function options(){
        const gui = new GUI();
        const lightsFolder = gui.addFolder("Lights");
        lights.forEach(light => {
            lightsFolder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
            lightsFolder.add(light, 'power', 1000, 10000);
        });

        const camFolder = gui.addFolder('Camera');
        camFolder.add(camera, 'fov', 30, 120);
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
