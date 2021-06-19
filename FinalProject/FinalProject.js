import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"

function loadScene(){
    THREE.Cache.enabled = true;
    const loader = new THREE.ObjectLoader();
    loader.load(('../resources/scenes/newScene.json'), function (scene) {init(scene)});
}

window.onload = loadScene();

    class Player {
        constructor(shipObject) {
            this.model = shipObject.getObjectByName("Ship");
            console.log(this.model.position.set(0,0,-2));
            this.cam =  shipObject.getObjectByName("shipCam");
            this.lights = shipObject.getObjectByName("shipLights");
            this.lights.children[1].visible = true;
            this.lights.children[1].intensity = 0.0;
            this.lights.children[0].intensity = 5.0;
            this.pov = true;
            this.engine = false;

            this.gear = 4,
            this.speed = [-0.2, -0.1, -0.05, -0.01, 0, 0.01, 0.05, 0.1, 0.2]

            this.incline = 0;
            this.flip = 0;

            this.fw = new THREE.Vector3();  // Flip Axis of Rotation
            this.u = new THREE.Vector3();
            this.w = new THREE.Vector3();   // Incline Axis of Rotation
            this.directions();

            this.controls = {
                'engine': 16,       //Shift
                'speedUp': 38,      // UpArrow
                'speedDown': 40,    // DownArrow
                'turnLeft': 37,     // LeftArrow
                'turnRight': 39,    // RightArrow

                'inclineUp': 87,    // W
                'inclineDown': 83,  // S
                'flipLeft': 65,     // A
                'flipRight': 68,    // D
                'reset': 8,
            };
/*
            this.controlli = {
                16: function engine() {
                        this.engine
                    }
                38: gear(+1),
                40: gear(-1),
                37: flip(0.05)
            }
*/
            window.addEventListener('keydown', (e) => {
                switch(e.keyCode){
                    case (this.controls['speedUp']):
                        if (this.engine && this.gear < 8) {
                            this.gear +=1;
                            this.lights.children[1].intensity += (2)*Math.sign(this.speed[this.gear]);
                        }
                    break;
                    case (this.controls['speedDown']):
                        if (this.engine && this.gear > 0) {
                            this.gear -=1;
                            this.lights.children[1].intensity -= 2*Math.sign(this.speed[this.gear]);
                        }
                    break;
                    case (this.controls['inclineUp']):
                        if (this.engine) this.cam.rotateOnWorldAxis(this.w,0.02);
                    break;
                    case (this.controls['inclineDown']):
                        if (this.engine) this.cam.rotateOnWorldAxis(this.w,-0.02);
                    break;

                    case (this.controls['flipLeft']):
                        if (this.engine) this.cam.rotateOnWorldAxis(this.fw,-0.05);
                    break;
                    case (this.controls['flipRight']):
                        if (this.engine) this.cam.rotateOnWorldAxis(this.fw,0.05);
                    break;
                    case this.controls['engine']:
                        this.engine = !this.engine;
                        this.gear = 4;
                        this.lights.children[1].intensity = this.engine;
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
                }
            });
        }

        directions() {
            if (this.pov) {
                this.cam.getWorldDirection(this.fw);
                this.u = this.cam.up.clone();
                this.w.crossVectors(this.fw,this.u);     // Incline Direction
            }
            else{
                this.fw = this.cam.up.clone();
                this.cam.getWorldDirection(this.u);
                this.u.negate();
                this.w.crossVectors(this.fw,this.u);
            }
            console.log(this.fw,this.u,this.w);
        }

        update(){
                this.cam.translateOnAxis(this.fw, this.speed[this.gear]);
        }

        landing(){
            let p = new THREE.Vector3();
            this.cam.getWorldDirection(this.fw);
            this.cam.getWorldPosition(p);
            p.negate().normalize();
            const phi = p.angleTo(this.fw);
            const w = new THREE.Vector3().crossVectors(this.fw,p);
            this.cam.rotateOnAxis(w, phi)
            this.switchPOV();

        //    const theta = p.angleTo(this.up)


            //console.log(w)
        }

        switchPOV(){
            if (this.pov){
                this.model.rotateOnWorldAxis(this.w,1.57);
            }
            else {
                console.log(this.fw)
                this.model.rotateOnWorldAxis(this.w,-1.57);
                console.log(this.fw)
            }
            this.pov = !this.pov;

            var x = this.fw;
            //console.log(x)
            this.fw = this.u;
            this.u = x;
            //console.log(this.fw,this.u,this.w);
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

    const ship = new Player(scene.getObjectByName("shipCam"));
    console.log(ship.model);
    const camera = ship.cam;
    const lights = [scene.getObjectByName("star1Light"), scene.getObjectByName("star2Light")];
    guiOptions();
    render();

    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        orbits(time*0.001);
        camera.updateProjectionMatrix();
        ship.update();

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

    function guiOptions(){
        const gui = new GUI();
        const lightsFolder = gui.addFolder("Lights");
        lights.forEach(light => {
            lightsFolder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
            lightsFolder.add(light, 'intensity', 10, 1000);
        });

        const camFolder = gui.addFolder('Camera');
        camFolder.add(camera, 'fov', 30, 120);
    }

    function orbits(t){
        scene.getObjectByName("Stars").rotation.y = t*0.1;
        scene.getObjectByName("PlanetZigarov").rotation.y = -t*0.01;
        scene.getObjectByName("Universe").rotation.y = t*0.01;
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
