import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es'
import { PCFShadowMap, SphereGeometry } from 'three';
import { PreventDragClick } from './PreventDragClick'
import { MySphere } from './MySphere';

// ----- 주제: 충돌 이벤트, 사운드 넣기

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.shadowMap.enabled = true // 그림자 설정
	renderer.shadowMap.type = THREE.PCFSoftShadowMap // 그림자가 좀더 부드러워지게 설정

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
	directionalLight.castShadow = true; // 그림자 설정
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)

	//-- CANNON(물리엔진) --
	// 먼저, 월드를 만들어야 함(마치 three.js에서 scene을 만드는 것처럼)
	const cannonWorld = new CANNON.World();
	cannonWorld.gravity.set(0, -9.8, 0) 	// 중력가속도 설정(수직방향, 즉 y축에 설정)

  // 성능향상을 위한 세팅
  cannonWorld.allowSleep = true; // body가 엄청 느려지면, 테스트 안함
  cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);
  // SAPBroadphase // 성능이 가장 좋음
  // NaiveBroadphase // 기본값
  // GridBroadphase // 구역을 나누어서 테스트


	// Contact Material
	const defaultMaterial = new CANNON.Material('default'); // 이름을 default라고 써줌
	const defaultContactMaterial = new CANNON.ContactMaterial(
		// 서로 부딪힐 2개의 Material 설정
		defaultMaterial,
		defaultMaterial,
		{
			friction: 0.5,   // 마찰력
			restitution: 0.3   // 반발력
		}
	);
	cannonWorld.defaultContactMaterial = defaultContactMaterial;

  
  // floor 물리기반 객체 생성
  const floorShape = new CANNON.Plane() 
  const floorBody = new CANNON.Body({    // 물리현상이 적용되는 실체(aka 투명 유리컵)
    mass: 0, // 가만히 고정되어 있어야 하므로, 중력의 영향을 안 받게 '질량= 0'으로 설정
    position: new CANNON.Vec3(0,0,0),
    shape: floorShape,  // CANNON에서는 'geometry' 대신 'shape'이라고 함
		material: defaultMaterial, // 재질 추가
  })
  // floorBody가 수직으로 세워져 있으므로 수평으로 눕히는(x축으로 회전) 작업 필요
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1,0,0), // 축 설정: x축
    Math.PI / 2 // 각도(90도) 설정
  )
  cannonWorld.addBody(floorBody)


	// Mesh
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10),
		new THREE.MeshStandardMaterial({
			color: 'slategray'
		})
	)
	floorMesh.rotation.x = -Math.PI/2
	floorMesh.receiveShadow = true 	// 그림자 설정
	scene.add(floorMesh)

  // spheres 배열 생성
  const spheres = []
  const sphereGeometry = new THREE.SphereGeometry(0.5); // 반지름: 0.5
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 'orange'
	});

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

    // console.log(delta);
    let cannonStepTime = 1/60    // fps=60. 화면 주사율에 따라 달라짐(맥북 M1 에어의 경우)
    if (delta < 0.01) cannonStepTime = 1/120 // 화면 주사율에 따라 달라짐(M2 맥북의 경우, 화면주사율이 120)
    cannonWorld.step(cannonStepTime, delta, 3) // 3은 보정 회수

    spheres.forEach(item => {
      item.mesh.position.copy(item.cannonBody.position)
      item.mesh.quaternion.copy(item.cannonBody.quaternion)
    })

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

  // 사운드 파일
  const sound = new Audio('/boing.mp3')

  // 충돌 event handler 함수 정의
  function collide(e) {
    const velocity = e.contact.getImpactVelocityAlongNormal();
    console.log(velocity);
    if (velocity > 2) {
      sound.currentTime = 0
      sound.play()
    }
  }

	// 이벤트
	window.addEventListener('resize', setSize);
  canvas.addEventListener('click', () => {
    const mySphere = new MySphere({
        scene, // scene: scene 와 같다!
        cannonWorld,
        geometry: sphereGeometry,
        material: sphereMaterial,
        x: (Math.random() - 0.5) * 2, // -1에서 1사이 랜덤으로 위치
        y: Math.random() * 5 + 2,
        z: (Math.random() - 0.5) * 2,
        scale: Math.random() + 0.2
      });
    spheres.push(mySphere);
    mySphere.cannonBody.addEventListener('collide', collide); // collide는 event handler. 위쪽에서 정의
  });

  const preventDragClick = new PreventDragClick(canvas) ;

	draw();
}
