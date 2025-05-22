// src/threejs/sceneManager.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Planet from './Planet'; // We'll create this next

let scene, camera, renderer, controls, planet;

export function initScene(mountElement, initialParams) {
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, mountElement.clientWidth / mountElement.clientHeight, 0.1, 1000);
  camera.position.z = 3;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  mountElement.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Planet
  planet = new Planet(initialParams);
  scene.add(planet.mesh);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Handle window resize
  window.addEventListener('resize', () => onWindowResize(mountElement));
  
  return { scene, camera, renderer, controls, planet }; // Return essentials
}

function onWindowResize(mountElement) {
  if (!camera || !renderer || !mountElement) return;
  camera.aspect = mountElement.clientWidth / mountElement.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
}

export function animate(sceneContainer) {
    if (!sceneContainer) return; // Stop if scene disposed
    requestAnimationFrame(() => animate(sceneContainer)); // Pass sceneContainer recursively
    sceneContainer.controls.update(); // Only if damping or auto-rotate is enabled
    sceneContainer.renderer.render(sceneContainer.scene, sceneContainer.camera);
}


// This function will be called from PlanetCanvas when params change
export function updatePlanetAppearance(planetInstance, newParams) {
  if (planetInstance) {
    planetInstance.update(newParams);
  }
}