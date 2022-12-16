import * as THREE from 'three';
import dat from 'dat.gui'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import { KeyController } from './KeyController';

// ----- 주제: PointerLockControls에 키보드 컨트롤 추가
// 마인크래프트 스타일 컨트롤

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

  // Controls
  const controls = new PointerLockControls(camera, renderer.domElement)
	// controls.lock()
  // console.log(controls.domElement === renderer.domElement);
  controls.domElement.addEventListener('click', () => {
    controls.lock()
  })
  controls.addEventListener('lock', ()=>{
    console.log('lock!');
  })
  controls.addEventListener('unlock', ()=>{
    console.log('unlock!');
  })

  // 키보드 컨트롤
  // 인스턴스 생성
  const keyController = new KeyController();

  function walk(){
    if (keyController.keys['KeyW'] || keyController.keys['ArrowUp']) {
      controls.moveForward(0.02)
    }
    if (keyController.keys['KeyS'] || keyController.keys['ArrowDown']) {
      controls.moveForward(-0.02)
    }
    if (keyController.keys['KeyA'] || keyController.keys['ArrowLeft']) {
      controls.moveRight(-0.02)
    }
    if (keyController.keys['KeyD'] || keyController.keys['ArrowRight']) {
      controls.moveRight(0.02)
    }
  }


  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;
  for (let i=0; i <20; i++){
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
        ${50+Math.floor(Math.random()*205)},
        ${50+Math.floor(Math.random()*205)},
        ${50+Math.floor(Math.random()*205)}
        )`
    });
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random()-0.5)*5
    mesh.position.y = (Math.random()-0.5)*5
    mesh.position.z = (Math.random()-0.5)*5
    scene.add(mesh)
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
    const delta = clock.getDelta();

    walk();

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