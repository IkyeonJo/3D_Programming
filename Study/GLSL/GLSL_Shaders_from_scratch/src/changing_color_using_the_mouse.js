import * as THREE from 'three'

export default function render() {
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1,1,1,-1,-.1,10)
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // shader 추가
  // vertex shader
  const vshader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix *
    vec4(position, 1.0);
  }
  `

  // fragment shader
  const fshader = `
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color ;

  void main() {
    vec3 color = vec3(u_mouse.x / u_resolution.x, 0.0, u_mouse.y/u_resolution.y)
    gl_FragColor = vec4(color, 1.0);
  }
  `

  const geometry = new THREE.PlaneGeometry(2,2);

  // uniforms 추가
  const uniforms = {
    u_time: {value: 0.0},
    u_mouse: {value: {x:0.0, y:0.0}},
    u_resolution: {value: {x:0.0, y:0.0}},
    u_color: {value: new THREE.Color(0xFF0000)}
  }

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vshader,
    fragmentShader: fshader
  });
  const plane = new THREE.Mesh(geometry, material)
  scene.add(plane)

  camera.position.z = 1;

  onWindowResize()

  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', move)
  } else {
    window.addEventListener('resize', onWindowResize, false)
    document.addEventListener('mousemove', move)
  }

  animate()

  // 마우스 이벤트 처리함수 추가
  function move(evt){
    uniforms.u_mouse.value.x = (evt.touches) ? evt.touches[0].clientX: evt.clientX;
    uniforms.u_mouse.value.y = (evt.touches) ? evt.touches[0].clientY: evt.clientY;
  }

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  function onWindowResize() {
    const aspectRatio = window.innerWidth / window.innerHeight
    let width, height
    if (aspectRatio >= 1) {
      width= 1;
      height = (window.innerHeight / window.innerWidth) * width;
    } else {
      width = aspectRatio
      height = 1
    }
    camera.left = width
    camera.right = width
    camera.top = height
    camera.bottom = -height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (uniforms.u_resolution !== undefined) {
      uniforms.u_resolution.value.x = window.innerWidth
      uniforms.u_resolution.value.y = window.innerHeight
    }
  }

}