import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 특정 방향의 광선(Ray)에 맞은 Mesh 판별하기

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
	camera.position.x = 5;
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

	// Mesh
	

  // 박스 메쉬 추가
  const boxGeometry = new THREE.BoxGeometry(1,1,1)
  const boxMaterial = new THREE.MeshStandardMaterial({color:'plum'})
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
	boxMesh.name = 'box'
  // 토러스 메쉬 추가
  const torusGeometry = new THREE.TorusGeometry(2,0.5,16,100)
  const torusMaterial = new THREE.MeshStandardMaterial({color: 'lime'})
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
	torusMesh.name = 'torus'

  scene.add(boxMesh, torusMesh)

  const meshes = [boxMesh, torusMesh]

	// Ray Caster
	const raycaster = new THREE.Raycaster();
  // mouse 추가. 마우스는 2차원 평면이기 때문에 Vector2()임
  const mouse = new THREE.Vector2()
  console.log(mouse);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		// boxMesh.position.y = Math.sin(time)*2
		// torusMesh.position.y = Math.cos(time)*2
		boxMesh.material.color.set('plum')
		torusMesh.material.color.set('lime')

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

  function checkIntersects(){
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(meshes)
    for (const item of intersects){
      console.log(item.object.name);
      // ray는 물체를 관통하기 때문에 매쉬가 겹칠 때 클릭하면 두 메쉬가 출력됨
      // 첫 번째 관통한 하나만 출력하려면, break를 써주면 됨
      break;
    }
    // 또는 다음 방법도 사용 가능
    // if (intersects[0]){
    //   console.log(intersects[0].object.name);
    // }
  }

	// 이벤트
	window.addEventListener('resize', setSize);
  canvas.addEventListener('click', e => {
    // console.log(e.clientX, e.clientY); // 마우스를 클릭한 위치. 뷰포트 왼쪽 위가 (0,0)
    // 가운데가 (0,0)인 three.js에 맞게 마우스 좌표 변환 필요
    mouse.x = e.clientX / canvas.clientWidth * 2 -1 ;
    mouse.y = -(e.clientY / canvas.clientHeight * 2 -1) ;
    // console.log(mouse);
    checkIntersects();
  })

	draw();
}