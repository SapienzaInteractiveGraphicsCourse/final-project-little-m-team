import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"

function loadScene(){
    THREE.Cache.enabled = false;
    const loader = new THREE.ObjectLoader();
    loader.load(('scenes/characterAnimation.json'), function (scene) {init(scene)});
}

window.onload = loadScene();

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

    class Astronaut {
        
    }


function init(scene){
    const canvas = document.getElementById("gl-canvas");
    canvas.width  = 1024;
    canvas.height = 576;

    const renderer = new THREE.WebGLRenderer({canvas});
    //renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    const camera = new THREE.PerspectiveCamera( 50, canvas.width / canvas.height, 0.01, 1000);
    camera.position.set(0,1,3);
    camera.rotateX(-0.2);
    scene.add(camera);

    const light = new THREE.PointLight();
    light.position.set(0, 0, 1);
    scene.add(light);

    const player = scene.getObjectByName("myAstronaut");
    console.log(player)

    //guiOptions();
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

        renderer.render(scene, camera);

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
