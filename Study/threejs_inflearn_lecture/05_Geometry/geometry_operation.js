import * as THREE from 'three';
import dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Geometry 정점(Vertex) position 이용하기

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
	camera.position.z = 10;
	scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5)
  const directionalLight = new THREE.DirectionalLight('white', 1)
  directionalLight.position.x = 1
  directionalLight.position.z = 2
  scene.add(ambientLight)
  scene.add(directionalLight)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)

	// Mesh
  // const geometry = new THREE.SphereGeometry(5, 64, 64)
  const geometry = new THREE.PlaneGeometry(10,10,32,32)
  const material = new THREE.MeshStandardMaterial({
    // color: 'orangered',
    // color: '#0e77ab',  // 바다 느낌 색
    color: 'seagreen',  // 숲속 느낌
    side: THREE.DoubleSide,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // console.log(geometry.attributes.position.array);
  const positionArray = geometry.attributes.position.array;
  const randomArray = [];
  for (let i=0; i<positionArray.length; i+=3){ // i를 3씩 늘림
    // 정점(Vertex) 한 개의 x,y,z 좌표를 랜덤으로 조정
    // positionArray[i] = positionArray[i] + (Math.random() - 0.5) * 0.2 //  x 좌표
    positionArray[i] += (Math.random() - 0.5) * 0.2 //  x 좌표
    positionArray[i+1] += (Math.random() - 0.5) * 0.2 //  y 좌표
    positionArray[i+2] += (Math.random() - 0.5) * 0.2 //  z 좌표

    randomArray[i] = (Math.random() - 0.5) * 0.2;
    randomArray[i+1] = (Math.random() - 0.5) * 0.2;
    randomArray[i+2] = (Math.random() - 0.5) * 0.2;
  }
  
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
    const time = clock.getElapsedTime() * 3;

    for (let i=0; i < positionArray.length; i += 3){
      positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001;
      positionArray[i+1] += Math.sin(time + randomArray[i+1] * 100) * 0.001;
      positionArray[i+2] += Math.sin(time + randomArray[i+2] * 100) * 0.001;
    }

    geometry.attributes.position.needsUpdate = true;

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