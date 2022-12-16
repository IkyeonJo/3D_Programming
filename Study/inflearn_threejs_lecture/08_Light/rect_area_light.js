import * as THREE from 'three';
import dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';

// ----- 주제: RectArea Light

export default function example() {

	// html에서 캔버스 가져와서 사용하기
	const canvas = document.querySelector('#three-canvas');

  // Renderer
	const renderer = new THREE.WebGLRenderer({
		canvas,
    antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(devicePixelRatio > 1 ? 2:1);
  // 그림자 설정
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFShadowMap // 기본값
  // renderer.shadowMap.type = THREE.BasicShadowMap // 그림자가 거칠어 짐(그래픽 스타일에 따라 이 옵션을 선택할 수도 있음. 픽셀아트 스타일. 성능도 가장 좋음)
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // PCFShadowMap 보다 좀더 부드러움

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

  // RectAreaLight
  // (마치 조명판처럼)사각형 모양의 영역에서 뿜어져 나오는 빛
 const light = new THREE.RectAreaLight('orange', 10, 2, 2) // 2*2 사이즈
//  light.position.x = -3;
 light.position.y = 3;
 light.position.z = 3;
 scene.add(light)

  // 조명을 보여주는 light helper 추가
  // 인수로 해당 조명 넣어줘야 함
  // RectAreaLightHelper는 three.js의 core에 없으므로
  // import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'; 를 꼭 해줘야 함
  // 그리고 아래에서 THREE를 붙여주면 안됨
  const lightHelper = new RectAreaLightHelper(light)
  scene.add(lightHelper)

  // 그림자 설정
  // light.castShadow = true;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)

  // Geometry
  const planeGeometry = new THREE.PlaneGeometry(10,10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(.7, 16, 16);

  // Material
  const material1 = new THREE.MeshStandardMaterial({color: 'white'})
  const material2 = new THREE.MeshStandardMaterial({color: 'white'})
  const material3 = new THREE.MeshStandardMaterial({color: 'white'})

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1)
  const box = new THREE.Mesh(boxGeometry, material2)
  const sphere = new THREE.Mesh(sphereGeometry, material3)
  scene.add(plane, box, sphere)
  
  // plane은 기본이 수직으로 서 있기 때문에 수평으로 눕혀주는 작업 필요
  plane.rotation.x = -Math.PI / 2 ;
  box.position.set(1,1,0)
  sphere.position.set(-1,1,0)

  // 그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

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
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // light.position.x = Math.cos(time) * 2;
    // light.position.z = Math.sin(time) * 2;

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