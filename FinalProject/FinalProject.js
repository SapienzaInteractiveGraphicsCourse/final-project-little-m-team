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

    class SpaceShip {
        constructor(shipObject) {
            this.model = shipObject;
            this.cam =  shipObject.getObjectByName("shipCam");
            this.lights = shipObject.getObjectByName("shipLights");

            this.lights.children[1].visible = true;
            this.lights.children[1].intensity = 0.0;
            this.lights.children[0].intensity = 10.0;

            this.engine = false;
            this.gear = 4,
            this.speed = [-0.2, -0.1, -0.05, -0.01, 0, 0.01, 0.05, 0.1, 0.2]

            this.rolling = 0;
            this.pitching = 0;
            this.camAngle = 0;

            this.fw = new THREE.Vector3();  // Flip Axis of Rotation
            this.u = new THREE.Vector3();
            this.w = new THREE.Vector3();   // Incline Axis of Rotation
            this.ray = new THREE.Raycaster();
            this.updateAxis();

            this.collision = false;
            this.landing = false;
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
            if((typeof cast !== 'undefined')&&(cast.distance <2)&&(!this.collision)){
                console.log("Collision Detected");
                this.collision = true;
                this.gear = 4;
                this.lights.children[1].intensity = this.engine;
            }
            else if((typeof cast !== 'undefined')&&(cast.distance >2)&&(this.collision)){
                this.collision = false;
            }
        }

        land() {
            if (this.engine) {
                if (this.landed){
                    this.model.translateOnAxis(this.u,2);
                    this.landed = false;
                }

                else{
                    var p = new THREE.Vector3();
                    this.model.getWorldPosition(p);
                    const d = p.length() - 10;

                    if (d<3){
                        const phi = p.angleTo(this.u);
                        this.model.rotateOnWorldAxis(this.w,phi);
                        this.model.translateOnAxis(this.u.negate(),d);
                        this.ssEngine();
                        this.landed = true;
                    }
                    else console.log("Too far for landing: ",d);
                }
            }
        }


        update(cast){
                this.checkCollision(cast);
                if (this.landing) this.land();
                else{
                    if (this.rolling != 0){
                        this.roll(this.rolling);
                        if(-0.2 < this.camAngle && this.camAngle  < 0.2){
                            this.cam.rotateZ(-this.rolling/2);
                            this.camAngle -= this.rolling/2;
                        }
                    }
                    else if (Math.abs(this.camAngle) > 0.01){
                        this.cam.rotateZ(-Math.sign(this.camAngle)*0.02);
                        this.camAngle -= Math.sign(this.camAngle)*0.02;
                    }
                    if (this.pitching != 0){
                        this.pitch(this.pitching);
                    }
                    this.model.translateY(-this.speed[this.gear]);
                }
                this.updateAxis();
        }

        ssEngine() {
            this.engine = !this.engine;
            console.log("Engine On: ",this.engine);
            this.gear = 4;
            this.lights.children[1].intensity = this.engine;
        }

        shiftUp(){
            if (this.engine && this.gear < 8 && !this.landed) {
                this.gear +=1;
                this.lights.children[1].intensity += (2)*Math.sign(this.speed[this.gear]);
            }
        }
        shiftDown(){
            if (this.engine && this.gear > 0 && !this.landed) {
                this.gear -=1;
                this.lights.children[1].intensity -= 2*Math.sign(this.speed[this.gear]);
            }
        }
        roll(theta){
            if (!this.landed) this.model.rotateY(theta);
        }
        pitch(phi){
            if (!this.landed) this.model.rotateX(phi);
        }
        dodge(theta){}
        reset(){}

        setUp(){
            window.addEventListener('keydown', (e) => {
                switch(e.code){
                    case "ShiftRight": this.ssEngine();               // Shift
                    break;
                    case "ArrowUp": this.shiftUp();                // Up Arrow
                    break;
                    case "ArrowDown": this.shiftDown();              // Down Arrow
                    break;
                    case "KeyW":                                // W
                        if (this.engine && this.pitching > -0.02){
                            this.pitching = -0.02;
                        }
                    break;
                    case "KeyS":                                // S
                        if (this.engine && this.pitching < 0.02){
                            this.pitching = 0.02;
                        }
                    break;
                    case "KeyA":                                // A
                        if (this.engine && this.rolling < 0.05){
                            this.rolling = 0.05;
                            //this.cam.rotateZ(-0.2);
                        }
                    break;
                    case "KeyD":                                // D
                        if (this.engine && this.rolling > -0.05){
                            this.rolling = -0.05;
                            //this.cam.rotateZ(0.2);
                        }
                    break;
                    case "ArrowLeft": this.dodge(-90);
                    break;
                    case "ArrowRight": this.dodge(90);
                    break;
                    case "KeyQ": this.land();
                    break;
                    case "Backspace": this.reset();
                    break;
                }
            });
            window.addEventListener('keyup', (e) => {
                switch(e.code){
                    case "KeyW": this.pitching = 0;
                    break;
                    case "KeyS": this.pitching = 0;
                    break;
                    case "KeyA":
                        if(this.rolling > 0){
                            //this.cam.rotateZ(0.2);
                            this.rolling = 0;
                        }
                    break;
                    case "KeyD":
                        if(this.rolling < 0){
                            //this.cam.rotateZ(-0.2);
                            this.rolling = 0;
                        }
                    break;
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


function init(scene){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const player = new SpaceShip(scene.getObjectByName("Ship"));
    player.setUp();

    const camera = player.cam;
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
        scene.getObjectByName("PlanetZigarov").raycast(player.ray,cast);
        //if (cast.length >0) console.log(cast[0].distance.toPrecision(3));
        player.update(cast[0]);
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
