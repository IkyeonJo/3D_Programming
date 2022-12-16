import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 드래그 클릭 방지
// 드래그했다가 놓았을 때 마치 클릭한 것처럼 처리되는 것을 방지

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
		// boxMesh.material.color.set('plum')
		// torusMesh.material.color.set('lime')

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
    if (mouseMoved) return; // mouseMoved가 참이면 함수 종료

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(meshes)
    for (const item of intersects){
      console.log(item.object.name);
      item.object.material.color.set('red')
      break;
    }
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
  // 마우스 이벤트를 이용, 마우스를 누른 상태에서 일정 픽셀 이상 이동하면 레이캐스팅이 안되도록 만듦
  let mouseMoved ; // 마우스를 드래그했는 여부. true/false
  let clickStartX ;
  let clickStartY ;
  let clickStartTime; // 클릭 후 일정 시간이 지나면, 클릭 안한 것으로 처리

  canvas.addEventListener('mousedown', e => {
    clickStartX = e.clientX
    clickStartY = e.clientY
    clickStartTime = Date.now()
    console.log(clickStartTime);
  });
  canvas.addEventListener('mouseup', e => {
    const xGap = Math.abs(e.clientX - clickStartX);
    const yGap = Math.abs(e.clientY - e.clickStartY)
    const timeGap = Date.now() - clickStartTime;

    if (xGap > 5 ||
        yGap > 5 ||
        timeGap > 500 // 클릭했다가 뗀 시간이 0.5초 이상인 경우
        ){
          mouseMoved = true;
        } else {
          mouseMoved = false
        }
  });

	draw();
}