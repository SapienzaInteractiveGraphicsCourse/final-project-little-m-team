import * as THREE from '../resources/three/build/three.module.js';
import { OrbitControls } from '../resources/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from '../resources/three/examples/jsm/loaders/GLTFLoader.js';
import {GUI} from "../resources/three/examples/jsm/libs/dat.gui.module.js"


window.onload = function init(){
    const canvas = document.getElementById("gl-canvas");
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.physicallyCorrectLights = true;
    aspect = canvas.width/canvas.height;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 25;
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, canvas);
    controls.update();
    const scene = new THREE.Scene();
    const objects = [];
//  an array of objects whose rotation to update

/*
    THREE.Cache.enabled = true;
    const loader = new THREE.ObjectLoader();
    loader.load(('../resources/scene.json'), function ( data ) {
        scene.add(data);
	},);
*/
//  GEOMETRY:
    const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);

// PLANETARY SYSTEM:
    const planetSystem = new THREE.Object3D();
    scene.add(planetSystem);
    objects.push(planetSystem);

    const planet = new THREE.Object3D();

    planetSystem.add(planet);
    objects.push(planet);

    const planetMaterial = new THREE.MeshToonMaterial({color: 0x646464});
    const planetMesh = new THREE.Mesh(sphereGeometry, planetMaterial);
    planetMesh.receiveShadow = true;
    planetMesh.position.y = 5;
    planet.add(planetMesh);
    objects.push(planetMesh);

    const stars = new THREE.Group();
    stars.scale.set(0.5,0.5,0.5);

    planetSystem.add(stars);
    objects.push(stars);

    const redStarMaterial = new THREE.MeshPhongMaterial({emissive: 0xFF8585, shininess: 0});
    const redStarMesh = new THREE.Mesh(sphereGeometry,redStarMaterial);
    const redLight = new THREE.PointLight(0xFF8585, 40, 0, 1);
    redLight.castShadow = true;
    const redStar = new THREE.Object3D();
    redStar.position.x = 25;

    stars.add(redStar);
    redStar.add(redStarMesh);
    redStar.add(redLight);
    objects.push(redStar);

    const greenStarMaterial = new THREE.MeshPhongMaterial({emissive: 0x55FF92});
    const greenStarMesh = new THREE.Mesh(sphereGeometry,greenStarMaterial);
    const greenLight = new THREE.PointLight(0x55FF92, 40, 0, 1);
    greenLight.castShadow = true;
    const greenStar = new THREE.Object3D();
    greenStar.position.x = -20;

    stars.add(greenStar);
    greenStar.add(greenStarMesh);
    greenStar.add(greenLight);
    objects.push(greenStar);
    console.log(objects)
    render();

    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        controls.update();
/*        objects.forEach((obj) => {
            obj.rotation.y = time/1000;
        });
*/
        stars.rotation.y = time/1000;
        planet.rotation.z = time/1000;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
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
