window.onload = function init(){
    canvas = document.getElementById("gl-canvas");
    const renderer = new THREE.WebGLRenderer({canvas});

    aspect = canvas.width/canvas.height;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
}
