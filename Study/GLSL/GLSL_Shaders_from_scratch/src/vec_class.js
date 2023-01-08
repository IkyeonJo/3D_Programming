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
  uniform vec3 u_color ;

  void main() {
    gl_FragColor = vec4(u_color, 1.0).grba;
  }
  `

  const geometry = new THREE.PlaneGeometry(2,2);

  // uniforms 추가
  const uniforms = {
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
  animate()

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
  }

}