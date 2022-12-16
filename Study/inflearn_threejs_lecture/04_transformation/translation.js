import * as THREE from 'three';

// ----- 주제: 위치이동(translation)

export default function example() {

	// html에서 캔버스 가져와서 사용하기
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
    antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
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
	camera.position.y = 1;
	camera.position.z = 5;
	scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5)
  const directionalLight = new THREE.DirectionalLight('white', 1)
  directionalLight.position.x = 1
  directionalLight.position.z = 2
  scene.add(ambientLight)
  scene.add(directionalLight)

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
  const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh)

	// 그리기
  const clock = new THREE.Clock()

  function draw(){
    const time = clock.getDelta();
    // mesh.position.y = 2
    // mesh.position.set(0,2,0)
    // mesh.position.set(-1,2,-5)
    mesh.position.set(-1,0,0)
    // console.log(mesh.position.length());
    // console.log(mesh.position.distanceTo(new THREE.Vector3(1,2,0)));
    // distance to camera
    console.log(mesh.position.distanceTo(camera.position));

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw)
  }

	// 사용자가 브라우저 크기 조정시 화면 크기 설정하는 함수 정의
	function setSize(){
		window.aspect = innerWidth/innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera)
	}

	// 이벤트
	window.addEventListener('resize', setSize)

  draw()
}