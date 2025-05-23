import * as THREE from 'three';

const atmosphereVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
uniform vec3 u_atmosphere_color;
uniform float u_atmosphere_density;
uniform float u_atmosphere_falloff;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float rim = 1.0 - max(0.0, dot(viewDirection, vNormal));
  
  // Create atmospheric glow effect
  float atmosphere = pow(rim, u_atmosphere_falloff) * u_atmosphere_density;
  
  // Add subtle color variation based on angle
  vec3 color = u_atmosphere_color;
  color += vec3(0.1, 0.05, 0.0) * pow(rim, 3.0);
  
  gl_FragColor = vec4(color, atmosphere);
}
`;

export default class Atmosphere {
  constructor(planetRadius, params) {
    this.params = params;
    
    // Create a slightly larger sphere for the atmosphere
    this.geometry = new THREE.SphereGeometry(planetRadius * 1.15, 64, 64);
    
    this.uniforms = {
      u_atmosphere_color: { value: new THREE.Color(params.atmosphereTint || '#87CEEB') },
      u_atmosphere_density: { value: params.atmosphereDensity || 0.5 },
      u_atmosphere_falloff: { value: 2.0 }
    };
    
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false
    });
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  
  update(newParams) {
    this.params = newParams;
    
    if (newParams.atmosphereTint) {
      this.uniforms.u_atmosphere_color.value = new THREE.Color(newParams.atmosphereTint);
    }
    
    if (typeof newParams.atmosphereDensity !== 'undefined') {
      this.uniforms.u_atmosphere_density.value = newParams.atmosphereDensity;
    }
  }
  
  setVisible(visible) {
    this.mesh.visible = visible;
  }
}