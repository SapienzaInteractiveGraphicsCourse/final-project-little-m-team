import * as THREE from '../resources/three/build/three.js';

import { OrbitControls } from '../Resources/three/examples/jsm/controls/OrbitControls.js';

window.onload = function init(){
    const canvas = document.getElementById("gl-canvas");
    const renderer = new THREE.WebGLRenderer({canvas});

    aspect = canvas.width/canvas.height;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;

    const controls = new THREE.OrbitControls(camera, canvas);

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);
    controls.update();
}
