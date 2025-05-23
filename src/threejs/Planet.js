// src/threejs/Planet.js
import * as THREE from 'three';
// Shader imports - these files will contain GLSL code
import planetVertexShader from './shaders/planetVertex.glsl';
import planetFragmentShader from './shaders/planetFragment.glsl';
import terrainFunctions from './shaders/terrainFunctions.glsl';

// 3D Simplex noise function implementation (Ashima Arts/Ian McEwan)
// From https://github.com/ashima/webgl-noise
const glslNoiseFunctions = `
//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 30.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

export default class Planet {
  constructor(initialParams) {
    this.params = initialParams;

    this.geometry = new THREE.IcosahedronGeometry(1, 64); // Radius 1, detail ~64
    
    // Uniforms that will be passed to the shaders
    this.uniforms = {
      u_time: { value: 0.0 },
      u_radius: { value: 1.0 },
      u_noise_scale: { value: this.params.noiseScale },
      u_seed_offset: { value: this.params.seed }, // Use seed to offset noise input
      u_water_level: { value: this.params.waterLevel },
      // FBM uniforms
      u_fbm_octaves: { value: this.params.fbmOctaves || 5 },
      u_fbm_initial_amplitude: { value: this.params.fbmInitialAmplitude || 0.5 },
      u_fbm_lacunarity: { value: this.params.fbmLacunarity || 2.0 },
      u_fbm_persistence: { value: this.params.fbmPersistence || 0.5 },
      u_fbm_strength: { value: this.params.fbmStrength || 0.3 },
      // Color uniforms
      u_water_color: { value: new THREE.Color(this.params.waterColor || '#006994') },
      u_water_deep_color: { value: new THREE.Color(this.params.waterDeepColor || '#001F3F') },
      u_sand_color: { value: new THREE.Color(this.params.sandColor || '#C19A6B') },
      u_grass_color: { value: new THREE.Color(this.params.vegetationColor || '#228B22') },
      u_rock_color: { value: new THREE.Color(this.params.rockColor || '#8B7355') },
      u_snow_color: { value: new THREE.Color(this.params.snowColor || '#FFFFFF') },
      // Biome parameters
      u_ice_cap_extent: { value: this.params.iceCapExtent || 0.1 },
      u_vegetation_coverage: { value: this.params.vegetationCoverage || 0.4 },
      u_desert_amount: { value: this.params.desertification || 0.2 },
      u_temperature: { value: this.params.temperatureRange || 15 },
      // Height thresholds
      u_beach_height: { value: 0.02 },
      u_grass_height: { value: 0.2 },
      u_rock_height: { value: 0.35 },
      u_snow_height: { value: 0.5 },
      // Advanced terrain parameters
      u_tectonic_activity: { value: this.params.tectonicActivity || 0.3 },
      u_erosion_factor: { value: this.params.erosionFactor || 0.0 },
      u_crater_density: { value: this.params.craterDensity || 0.0 },
      // Exotic world parameters
      u_surface_emission: { value: this.params.surfaceEmission || 0.0 },
      u_lava_flows: { value: this.params.lavaFlows || 0.0 },
      u_organic_haze: { value: this.params.organicHaze || 0.0 },
      u_crystalline_formations: { value: this.params.crystallineFormations || 0.0 },
      u_acid_rain: { value: this.params.acidRain || 0.0 },
      u_surface_roughness: { value: this.params.surfaceRoughness || 0.5 },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslNoiseFunctions + terrainFunctions + planetVertexShader,
      fragmentShader: planetFragmentShader,
      glslVersion: THREE.GLSL3,
      // wireframe: true, // Useful for debugging
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  update(newParams) {
    this.params = newParams;
    this.uniforms.u_noise_scale.value = this.params.noiseScale;
    this.uniforms.u_seed_offset.value = this.params.seed;
    this.uniforms.u_water_level.value = this.params.waterLevel;
    // Update FBM uniforms
    this.uniforms.u_fbm_octaves.value = this.params.fbmOctaves || 5;
    this.uniforms.u_fbm_initial_amplitude.value = this.params.fbmInitialAmplitude || 0.5;
    this.uniforms.u_fbm_lacunarity.value = this.params.fbmLacunarity || 2.0;
    this.uniforms.u_fbm_persistence.value = this.params.fbmPersistence || 0.5;
    this.uniforms.u_fbm_strength.value = this.params.fbmStrength || 0.3;
    
    // Update color uniforms
    if (this.params.waterColor) this.uniforms.u_water_color.value = new THREE.Color(this.params.waterColor);
    if (this.params.waterDeepColor) this.uniforms.u_water_deep_color.value = new THREE.Color(this.params.waterDeepColor);
    if (this.params.sandColor) this.uniforms.u_sand_color.value = new THREE.Color(this.params.sandColor);
    if (this.params.vegetationColor) this.uniforms.u_grass_color.value = new THREE.Color(this.params.vegetationColor);
    if (this.params.rockColor) this.uniforms.u_rock_color.value = new THREE.Color(this.params.rockColor);
    if (this.params.snowColor) this.uniforms.u_snow_color.value = new THREE.Color(this.params.snowColor);
    
    // Update biome parameters
    if (typeof this.params.iceCapExtent !== 'undefined') this.uniforms.u_ice_cap_extent.value = this.params.iceCapExtent;
    if (typeof this.params.vegetationCoverage !== 'undefined') this.uniforms.u_vegetation_coverage.value = this.params.vegetationCoverage;
    if (typeof this.params.desertification !== 'undefined') this.uniforms.u_desert_amount.value = this.params.desertification;
    if (typeof this.params.temperatureRange !== 'undefined') this.uniforms.u_temperature.value = this.params.temperatureRange;
    
    // Update advanced terrain parameters
    if (typeof this.params.tectonicActivity !== 'undefined') this.uniforms.u_tectonic_activity.value = this.params.tectonicActivity;
    if (typeof this.params.erosionFactor !== 'undefined') this.uniforms.u_erosion_factor.value = this.params.erosionFactor;
    if (typeof this.params.craterDensity !== 'undefined') this.uniforms.u_crater_density.value = this.params.craterDensity;
    
    // Update exotic world parameters
    if (typeof this.params.surfaceEmission !== 'undefined') this.uniforms.u_surface_emission.value = this.params.surfaceEmission;
    if (typeof this.params.lavaFlows !== 'undefined') this.uniforms.u_lava_flows.value = this.params.lavaFlows;
    if (typeof this.params.organicHaze !== 'undefined') this.uniforms.u_organic_haze.value = this.params.organicHaze;
    if (typeof this.params.crystallineFormations !== 'undefined') this.uniforms.u_crystalline_formations.value = this.params.crystallineFormations;
    if (typeof this.params.acidRain !== 'undefined') this.uniforms.u_acid_rain.value = this.params.acidRain;
    if (typeof this.params.surfaceRoughness !== 'undefined') this.uniforms.u_surface_roughness.value = this.params.surfaceRoughness;
  }

  // Optional: if you want the planet to animate itself (e.g. u_time for evolving noise)
  tick(delta) {
    // this.uniforms.u_time.value += delta;
  }
}
