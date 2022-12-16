import * as THREE from 'three';
import dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Point Light
// 어떤 지점에서 전 방향으로 퍼지는 빛

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

  // PointLight
  // 어떤 지점에서 전 방향으로 퍼지는 빛
  // 전구에서 나오는 빛과 유사
  const light = new THREE.PointLight('white', 1, 100, 2)
  light.position.y = 3
  light.position.x = 3
  scene.add(light)

  // 조명을 보여주는 light helper 추가
  // 인수로 해당 조명 넣어줘야 함
  const lightHelper = new THREE.PointLightHelper(light)
  scene.add(lightHelper)

  // 그림자 설정
  light.castShadow = true;
  light.shadow.mapSize.width = 1024; // 기본값: 512
  light.shadow.mapSize.height = 1024; // mapSize를 키우면 성능이 저하되므로 적당한 선에서 타협해야 함
  // light.shadow.radius = 5; // 그림자 반지름을 조정해 가장자리 부드럽게 처리
  // 아래 설정은 renderer.shadowMap.type = THREE.BasicShadowMap 으로 설정한 경우만 유의미
  // light.shadow.mapSize.width = 64; // 픽셀 수를 대폭 줄임으로써 마인크래프트 같은 픽셀아트 스타일로 조정
  // light.shadow.mapSize.height = 64; // 
  light.shadow.camera.near = 1;
  // light.shadow.camera.far = 5; // 이렇게 설정하면 카메라 위치에 따라 그림자가 잘릴 수 있음
  light.shadow.camera.far = 30; // 값을 크게 설정하면 성능이 다소 떨어질 수는 있지만, 그래도 어느 정도 여유있게 설정해야 함

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

    light.position.x = Math.cos(time) * 5;
    light.position.z = Math.sin(time) * 5;

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