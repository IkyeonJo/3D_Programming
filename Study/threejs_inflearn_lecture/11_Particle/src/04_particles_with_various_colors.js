import * as THREE from 'three';
import { TetrahedronGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 이미지 임포트
import stars from './images/star.png'

// ----- 주제: 여러 가지 색상의 파티클

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
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	
  // BufferGeometry: 형태가 없는 지오메트리. vertex 정보 설정을 통해 지오메트리를 만드는 개념.
	const geometry = new THREE.BufferGeometry(1, 32, 32);
  const count = 1000;
  const positions = new Float32Array(count * 3); // 3은 점 하나가 (x,y,z) 3개의 좌표를 갖고 있기 때문
  // 색상 배열 추가
  const colors = new Float32Array(count * 3); // 3은 점 하나가 (x,y,z) 3개의 좌표를 갖고 있기 때문

  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    // 색상 관련 추가
    colors[i] = Math.random();
  }
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  // 색상 속성 추가
  geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
  );
  // console.log(geometry);


  // texture
  const textureLoader = new THREE.TextureLoader();
  const particleTexture = textureLoader.load(stars)

  const material = new THREE.PointsMaterial({
    size: 0.1,
    map: particleTexture, 
    // 파티클 이미지를 투명하게 세팅
    transparent: true,
    alphaMap: particleTexture,
    depthWrite: false,
    // 색상
    vertexColors: true,
  });
  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

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
