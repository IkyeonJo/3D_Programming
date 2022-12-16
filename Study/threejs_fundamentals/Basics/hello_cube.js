import * as THREE from 'three';

export default function main() {
  //-- Renderer 세팅
  const canvas = document.querySelector('#canvas')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })

  //-- Camera 세팅
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  //--- Scene 세팅
  const scene = new THREE.Scene();

  //-- Mesh 생성

  // Geometry 생성
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  // Material 생성
  const material = new THREE.MeshPhongMaterial({
    color: 0x44aa88
  });
  // Mesh 생성
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ]

  // Light 설정
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // 애니메이션
  function render(time) {
    time *= 0.001;

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    })

    renderer.render(scene, camera);

    requestAnimationFrame(render)
  }
  // requestAnimationFrame(render);
  render();

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color})

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }
}