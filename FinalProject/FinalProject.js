import * as THREE from '../resources/three/build/three.module.js';

import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"


window.onload = function init(){
    const canvas = document.getElementById("gl-canvas");
    const renderer = new THREE.WebGLRenderer({canvas});

    aspect = canvas.width/canvas.height;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const controls = new OrbitControls(camera, canvas);
    controls.update();
    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    animate()
    function animate() {
    	requestAnimationFrame( animate );
    	// required if controls.enableDamping or controls.autoRotate are set to true
    	controls.update();
    	renderer.render( scene, camera );
    }
}
