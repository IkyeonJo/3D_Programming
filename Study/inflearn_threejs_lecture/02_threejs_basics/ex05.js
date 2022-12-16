import * as THREE from 'three';
import { Light } from 'three';

// ----- 주제: 애니메이션

export default function example() {

	// html에서 캔버스 가져와서 사용하기
	const canvas = document.querySelector('#three-canvas');
	// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
	const renderer = new THREE.WebGLRenderer({
		canvas,
    antialias: true,
    // alpha: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// console.log(window.devicePixelRatio);
	renderer.setPixelRatio(devicePixelRatio > 1 ? 2:1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	// Perspective Camera(원근 카메라)
	const camera = new THREE.PerspectiveCamera(
		75, // 시야각(field of view)
		window.innerWidth / window.innerHeight, // 종횡비(aspect)
		0.1, // near
		1000 // far
	);
	// camera.position.y = 2;
	camera.position.z = 5;
	scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.z = 2
  light.position.x = 2
  scene.add(light)

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'red'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
  const clock = new THREE.Clock();

  function draw(){
    // 성능 보정
    const time = clock.getElapsedTime();
    // console.log(clock.getElapsedTime());
    // 360도는 2파이 라디언
    // mesh.rotation.y += 0.1
    // degree 기준
    mesh.rotation.y = time * 2 ;
    mesh.position.y = time
    if (mesh.position.y > 3) {
      mesh.position.y = 0
    }

    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw)
    // renderer 자체 메서드
    renderer.setAnimationLoop(draw)
  }

  draw()

	//
	function setSize(){
		window.aspect = innerWidth/innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera)
	}

	// 이벤트
	window.addEventListener('resize', setSize)
}