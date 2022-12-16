import * as THREE from 'three';
import gsap from 'gsap';

// ----- 라이브러리를 이용한 애니메이션

export default function example() {

	// html에서 캔버스 가져와서 사용하기
	const canvas = document.querySelector('#three-canvas');
	// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
	const renderer = new THREE.WebGLRenderer({
		canvas,
    antialias: true,
    // alpha: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// console.log(window.devicePixelRatio);
	renderer.setPixelRatio(devicePixelRatio > 1 ? 2:1);

	// Scene
	const scene = new THREE.Scene();
  // 안개 추가
  // scene.fog = new THREE.Fog('blue', 3, 7)
  // 안개를 배경색(여기서는 검은색)과 똑같이 설정하면 메시가 사라지는 효과를 넣을 수 있음
  scene.fog = new THREE.Fog('black', 3, 7)

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
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.x = 2
  light.position.y = 3
  light.position.z = 5
  scene.add(light)

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'red'
	});

  // Mesh
  const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh)

  // const meshes = [];

	// let mesh;
  // for (let i=0; i<10; i++){
  //   mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.x = Math.random() * 5 - 2.5;
  //   mesh.position.z = Math.random() * 5 - 2.5;
  //   scene.add(mesh);
  //   meshes.push(mesh);
  // }

	// 그리기
  let time = Date.now()

  function draw(){
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

  // meshes.forEach(item => {
  //   item.rotation.y += deltaTime * 0.001;
  // })

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw)
  }

  // gsap
  gsap.to(
    mesh.position,
    {
      duration:1 ,
      y: 2,
      z: 3,
    }
  );


	//
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