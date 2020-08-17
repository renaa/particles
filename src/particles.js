import * as THREE from "three"
import Boid from "./boid"
import Stats from 'stats.js'

let scene, camera, renderer
let stats

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // controls = new THREE.Orbitcontrols(camera) orbitcontrols assa
})

function initThree() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  camera.position.z = 5

  stats = new Stats()
  document.body.appendChild(stats.dom)
}
initThree()

function addCube(){
  let geometry = new THREE.BoxGeometry()
  let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  let cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}
// addCube()

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  stats.update()
}
animate()



