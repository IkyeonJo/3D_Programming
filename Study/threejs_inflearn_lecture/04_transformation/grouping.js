import * as THREE from 'three';
import dat from 'dat.gui';

// ----- 주제: 그룹 만들기(Scene Graph)

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
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 만약 구 형태로 메쉬를 만들고 싶다면, 간단하게 이렇게 할 수 있음
  const sunGeometry = new THREE.SphereGeometry(1, 16, 16);
	// const material = new THREE.MeshStandardMaterial({
	// 	color: 'hotpink'
	// });
	const sunMaterial = new THREE.MeshStandardMaterial({
		color: 0xff0055
	});
  const earthGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const earthMaterial = new THREE.MeshStandardMaterial({
		color: 0x0033ff
	});
  const moonGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const moonMaterial = new THREE.MeshStandardMaterial({
		color: 0xffff00
	});


  // group1(태양)
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  const group1 = new THREE.Group()
  // const box1 = new THREE.Mesh(geometry, material);
  // group2(지구)
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  const group2 = new THREE.Group()
  // const box2 = new THREE.Mesh(geometry, material);
  // 다음처럼 복제해서 쓸 수도 있음
  // const box2 = box1.clone()
  // box2.scale.set(0.3, 0.3, 0.3)
  group2.position.x = 2
  // group3(달)
  // const group3 = new THREE.Object3D()
  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  const group3 = new THREE.Group()
  // const box3 = box2.clone()
  // box3.scale.set(0.15, 0.15, 0.15)
  group3.position.x = 0.5

  // add mesh, group to groups
  group3.add(moonMesh)
  group2.add(earthMesh, group3)
  group1.add(sunMesh, group2)
  // group1만 scene에 add하면 결과적으로 group1, group2,group3가 모두 add된다!
  scene.add(group1)
  
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

    group1.rotation.y += delta;
    group2.rotation.y += delta;
    group3.rotation.y += delta;

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