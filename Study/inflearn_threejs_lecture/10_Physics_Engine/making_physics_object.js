import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es'

// ----- 주제: cannon.js 기본 세팅

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http
// 설치 필요: npm i cannon-es

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)

	//-- CANNON(물리엔진) --
	// 먼저, 월드를 만들어야 함(마치 three.js에서 scene을 만드는 것처럼)
	const cannonWorld = new CANNON.World();
	// 중력가속도 설정
	cannonWorld.gravity.set(0, -9.8, 0)
  
  // floor 물리기반 객체 생성
  const floorShape = new CANNON.Plane() 
  const floorBody = new CANNON.Body({    // 물리현상이 적용되는 실체(aka 투명 유리컵)
    mass: 0, // 가만히 고정되어 있어야 하므로, 중력의 영향을 안 받게 '질량= 0'으로 설정
    position: new CANNON.Vec3(0,0,0),
    shape: floorShape  // CANNON에서는 'geometry' 대신 'shape'이라고 함
  })
  // floorBody가 수직으로 세워져 있으므로 수평으로 눕히는(x축으로 회전) 작업 필요
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1,0,0), // 축 설정: x축
    Math.PI / 2 // 각도(90도) 설정
  )
  cannonWorld.addBody(floorBody)

  // box 물리기반 객체 생성
  const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 2.5, 0.25)) // (반지름 비슷하게) 중심에서부터의 거리임 -> 따라서 실제 크기는 설정된 값의 2배임
  const boxBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0,10,0),
    shape: boxShape
  });
  cannonWorld.addBody(boxBody)

	// Mesh
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10),
		new THREE.MeshStandardMaterial({
			color: 'slategray'
		})
	)
	floorMesh.rotation.x = -Math.PI/2
	scene.add(floorMesh)

	const boxGeometry = new THREE.BoxGeometry(0.5, 5, 0.5); // 굉장히 홀쭉한 박스로 세팅
	const boxMaterial = new THREE.MeshStandardMaterial({
		color: 'rgb(65,12,12)'
	});
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.position.y = 0.5
	scene.add(boxMesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

    // console.log(delta);
    let cannonStepTime = 1/60    // fps=60. 화면 주사율에 따라 달라짐(맥북 M1 에어의 경우)
    if (delta < 0.01) cannonStepTime = 1/120 // 화면 주사율에 따라 달라짐(M2 맥북의 경우, 화면주사율이 120)
    cannonWorld.step(cannonStepTime, delta, 3) // 3은 보정 회수
		// 비유컨대, 투명컵과 빨간색이 겹치게 설정
    boxMesh.position.copy(boxBody.position) // 위치 복사(boxBody의 위치 정보를 boxMesh에 복사)
    boxMesh.quaternion.copy(boxBody.quaternion) // 회전 복사(boxBody의 회전 정보를 boxMesh에 복사)

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
