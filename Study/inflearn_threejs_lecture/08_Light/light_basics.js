import * as THREE from 'three';
import dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Light 기본

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

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3)
  scene.add(axesHelper)

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
  // AmbientLight
  // 은은하게 전체적으로 깔아주는 빛(광원, 조명)
  // 위치 속성이 따로 없음. 그림자 만들 수 없음
  // 그래서 보통 앰비언트를 기본으로 깔아주고, 다른 조명을 추가해 줌
  const ambientLight = new THREE.AmbientLight('white', 0.5)
  scene.add(ambientLight)
  // DirectionalLight
  // 태광양 같은 느낌
  // 멀리서 직선의, 평행의 광선을 쏴줌
  // 그림자 만들어 줌
  const light = new THREE.DirectionalLight('white', 0.5)
  light.position.y = 3
  light.position.x = 3
  scene.add(light)

  // 조명을 보여주는 light helper 추가
  // 인수로 해당 조명 넣어줘야 함
  const lightHelper = new THREE.DirectionalLightHelper(light)
  scene.add(lightHelper)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)

  // Geometry
  const planeGeometry = new THREE.PlaneGeometry(10,10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(.7, 16, 16);

  // Material
  const material1 = new THREE.MeshStandardMaterial({color: 'white'})
  const material2 = new THREE.MeshStandardMaterial({color: 'royalblue'})
  const material3 = new THREE.MeshStandardMaterial({color: 'gold'})

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1)
  const box = new THREE.Mesh(boxGeometry, material2)
  const sphere = new THREE.Mesh(sphereGeometry, material3)
  scene.add(plane, box, sphere)
  
  // plane은 기본이 수직으로 서 있기 때문에 수평으로 눕혀주는 작업 필요
  plane.rotation.x = -Math.PI / 2 ;
  box.position.set(1,1,0)
  sphere.position.set(-1,1,0)


  // dat.GUI
  const gui = new dat.GUI();
  // GUI로 조정하고자 하는 객체, (조정하고자 하는 객체의) 속성, 최소 범위, 최대 범위 설정, 조정 스텝
  // (directional) light의 위치 
  gui.add(light.position, 'x', -5, 5, 0.01).name('Light의 X위치')
  gui.add(light.position, 'y', -5, 5, 0.01).name('Light의 Y위치')
  gui.add(light.position, 'z', -5, 5, 0.01).name('Light의 Z위치')

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