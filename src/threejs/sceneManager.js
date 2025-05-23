// src/threejs/sceneManager.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Planet from './Planet';
import Atmosphere from './Atmosphere';

let scene, camera, renderer, controls, planet, atmosphere, clock;

export function initScene(mountElement, initialParams) {
  scene = new THREE.Scene();
  clock = new THREE.Clock();

  // Camera
  camera = new THREE.PerspectiveCamera(75, mountElement.clientWidth / mountElement.clientHeight, 0.1, 1000);
  camera.position.z = 3;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  mountElement.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  // Main sun light
  const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
  sunLight.position.set(5, 3, 5);
  sunLight.castShadow = true;
  scene.add(sunLight);
  
  // Rim light for better planet definition
  const rimLight = new THREE.DirectionalLight(0x4fc3f7, 0.3);
  rimLight.position.set(-5, 0, -5);
  scene.add(rimLight);

  // Planet
  planet = new Planet(initialParams);
  scene.add(planet.mesh);
  
  // Atmosphere
  atmosphere = new Atmosphere(1.0, initialParams);
  scene.add(atmosphere.mesh);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 1.5;
  controls.maxDistance = 10;

  // Handle window resize
  window.addEventListener('resize', () => onWindowResize(mountElement));
  
  return { scene, camera, renderer, controls, planet, atmosphere, clock }; // Return essentials
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
    
    const delta = sceneContainer.clock.getDelta();
    
    // Update controls
    sceneContainer.controls.update();
    
    // Rotate planet if rotation speed is set
    if (sceneContainer.planet && sceneContainer.planet.mesh) {
      const rotationSpeed = sceneContainer.planet.params.rotationSpeed || 1.0;
      sceneContainer.planet.mesh.rotation.y += delta * 0.1 * rotationSpeed;
    }
    
    // Animate any shader uniforms that need time
    if (sceneContainer.planet) {
      sceneContainer.planet.tick(delta);
    }
    
    sceneContainer.renderer.render(sceneContainer.scene, sceneContainer.camera);
}


// This function will be called from PlanetCanvas when params change
export function updatePlanetAppearance(sceneContainer, newParams) {
  if (sceneContainer.planet) {
    sceneContainer.planet.update(newParams);
  }
  
  if (sceneContainer.atmosphere) {
    sceneContainer.atmosphere.update(newParams);
  }
}