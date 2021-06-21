import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"

function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('../resources/scenes/newScenee.json'), function (scene) {init(scene)});
}

window.onload = loadScene();

    class Player {
        constructor(shipObject) {
            this.model = shipObject;
            this.cam =  shipObject.getObjectByName("shipCam");
            this.lights = shipObject.getObjectByName("shipLights");

            this.lights.children[1].visible = true;
            this.lights.children[1].intensity = 0.0;
            this.lights.children[0].intensity = 5.0;

            this.engine = false;
            this.gear = 4,
            this.speed = [-0.2, -0.1, -0.05, -0.01, 0, 0.01, 0.05, 0.1, 0.2]

            this.incline = 0;
            this.flip = 0;

            this.fw = new THREE.Vector3();  // Flip Axis of Rotation
            this.u = new THREE.Vector3();
            this.w = new THREE.Vector3();   // Incline Axis of Rotation
            this.ray = new THREE.Raycaster();
            this.updateAxis();

            this.collision = false;
            this.landing = false;

            this.setUp();
        }
        ssEngine(){
            this.engine = !this.engine;
            this.gear = 4;
            this.lights.children[1].intensity = this.engine;
        }
        shiftUp(){
            if (this.engine && this.gear < 8) {
                this.gear +=1;
                this.lights.children[1].intensity += (2)*Math.sign(this.speed[this.gear]);
            }
        }
        shiftDown(){
            if (this.engine && this.gear > 0) {
                this.gear -=1;
                this.lights.children[1].intensity -= 2*Math.sign(this.speed[this.gear]);
            }
        }
        updateAxis() {
            var front = new THREE.Vector3();
            var back = new THREE.Vector3();
            var left = new THREE.Vector3();
            var right = new THREE.Vector3();

            this.lights.getObjectByName("frontLight").getWorldPosition(front);
            this.lights.getObjectByName("engineLight").getWorldPosition(back);
            this.lights.getObjectByName("leftLight").getWorldPosition(left);
            this.lights.getObjectByName("rightLight").getWorldPosition(right);

            this.fw = front.clone().add(back.negate()).normalize();
            this.w = right.clone().add(left.negate()).normalize();
            this.u.crossVectors(this.w,this.fw);
            this.ray.set(front,this.fw);
        }
        checkCollision(cast){
            if((typeof cast !== 'undefined')&&(cast.distance <2)){
                console.log("Collision Detected");
                this.collision = true;
                this.gear = 4;
            }
        }
        get distance(){
            var p = new THREE.Vector3();
            p = this.model.getWorldPosition(p);
            console.log(p.length());
            return p.length();
        }

        land() {
            this.gear = 4;                  // speed = 0;
            var p = new THREE.Vector3();
            this.model.getWorldPosition(p);
            const phi = p.angleTo(this.u)
            this.model.rotateOnWorldAxis(this.w,phi);
            this.model.getWorldPosition(p);
            const d = this.distance - 10;
            console.log(phi,d);
            this.model.translateOnAxis(this.u.negate(),d);

            this.landing = false;
        }

        update(cast){
                if (!this.collision) this.checkCollision(cast);
                this.model.translateY(-this.speed[this.gear]);

                if (this.landing) this.land();
                this.updateAxis();

        }
        roll(theta){}
        pitch(phi){}
        dodge(theta){}
        reset(){}

        setUp(){
            const controls = {
                16: this.ssEngine(),    // Shift
                38: this.shiftUp(),     // Up Arrow
                40: this.shiftDown(),   // Down Arrow

                87: this.pitch(-0.05),  //
                83: this.pitch(0.05),

                65: this.roll(0.1),
                68: this.roll(-0.1),

                37: this.dodge(-90),
                39: this.dodge(90),

                81: this.land(),

                8: this.reset()
            }
            window.addEventListener('keydown', (e) => {
                switch(e.keyCode){
                    case (this.controls['speedUp']):

                    break;
                    case (this.controls['speedDown']):
                    break;
                    case (this.controls['inclineUp']):
                        if (this.engine) this.model.rotateX(-0.1);
                    break;
                    case (this.controls['inclineDown']):
                        if (this.engine) this.model.rotateX(0.1);
                    break;

                    case (this.controls['flipLeft']):
                        this.model.rotateY(0.1);
                    break;
                    case (this.controls['flipRight']):
                        if (this.engine) this.model.rotateY(-0.1);
                    break;
                    case this.controls['engine']:
                        this.engine = !this.engine;
                        this.gear = 4;
                        this.lights.children[1].intensity = this.engine;
                    break;
                    case this.controls['reset']:
                        this.cam.lookAt(0,0,0);
                    case 86:
                        //this.switchPOV();
                    break;
                    case 81:
                        const d = this.distance;
                        if (d<13) {
                            console.log(d);
                            land();
                        }
                    break;
                    default:
                        console.log(e.keyCode);
                }
            });
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

    const ship = new Player(scene.getObjectByName("Ship"));
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
        var cast = new Array();
        scene.getObjectByName("PlanetZigarov").raycast(ship.ray,cast);
        //if (cast.length >0) console.log(cast[0].distance.toPrecision(3));
        ship.update(cast[0]);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
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
