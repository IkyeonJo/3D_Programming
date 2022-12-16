import * as THREE from 'three';
import dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: MeshLambertMaterial, MeshPhongMaterial

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
  scene.background = new THREE.Color('white')

	// Camera
	// Perspective Camera(원근 카메라)
	const camera = new THREE.PerspectiveCamera(
		75, // 시야각(field of view)
		window.innerWidth / window.innerHeight, // 종횡비(aspect)
		0.1, // near
		1000 // far
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5)

  const directionalLight = new THREE.DirectionalLight('white', 1)
  directionalLight.position.set(1,0,2)
  scene.add(ambientLight, directionalLight)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)

  // Mesh
  const geometry = new THREE.SphereGeometry(1, 16, 16);
  // MeshLambertMaterial: 하이라이트, 반사광 없는 재질
  const material1 = new THREE.MeshLambertMaterial({
    color: 'orange'
  })
  // MeshPhongMaterial: 하이라이트, 반사광 있는 재질
  const material2 = new THREE.MeshPhongMaterial({
    color: 'orange',
    shininess: 1000
    // shininess: 0
  })
  const mesh1 = new THREE.Mesh(geometry, material1)
  const mesh2 = new THREE.Mesh(geometry, material2)
  mesh1.position.x = -2.5
  mesh1.position.x = 2.5
  scene.add(mesh1, mesh2)
  
  // dat.GUI
  const gui = new dat.GUI();
  // GUI로 조정하고자 하는 객체, (조정하고자 하는 객체의) 속성, 최소 범위, 최대 범위 설정, 조정 스텝
  // camera의 위치 
  gui.add(camera.position, 'x', -10, 10, 0.01).name('카메라의 X위치')
  gui.add(camera.position, 'y', -10, 10, 0.01).name('카메라의 Y위치')
  gui.add(camera.position, 'z', -10, 10, 0.01).name('카메라의 Z위치')

	// 그리기
  const clock = new THREE.Clock();

  function draw(){
    const delta = clock.getDelta();

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