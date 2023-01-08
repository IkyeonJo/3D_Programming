import *  as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
console.log(vertexShader)
console.log(fragmentShader);

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,  // fov
  innerWidth/innerHeight,  // aspect ratio
  0.1,   // near
  1000  // far
)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2:1)
document.body.appendChild(renderer.domElement)

// sphere 생성
const geometry = new THREE.SphereGeometry(5,50,50)
// material에서 vertex shader와 fragment shader를 연결시킴
// 연결고리는 ShaderMaterial임!
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new THREE.TextureLoader().load(
        './img/globe.jpeg'
      )
    }
  }
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere);

camera.position.z  = 10

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()