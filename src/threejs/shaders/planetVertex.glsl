// Standard uniforms for ShaderMaterial in Three.js
// no need to define position, normal, modelMatrix, etc. as they are provided

// Custom uniforms
uniform float u_time;
uniform float u_radius;
uniform float u_noise_scale;
uniform float u_seed_offset; // Use this to vary noise input
uniform int u_fbm_octaves;
uniform float u_fbm_initial_amplitude;
uniform float u_fbm_lacunarity;    // How much frequency increases per octave
uniform float u_fbm_persistence;   // How much amplitude decreases per octave
uniform float u_fbm_strength;      // Overall multiplier for the displacement
uniform float u_tectonic_activity;
uniform float u_erosion_factor;
uniform float u_crater_density;

// Variables passed to the fragment shader
out float v_height;
out vec3 v_normal;
out vec3 v_world_position;
out vec2 v_uv;
out float v_noise;


// Simplex noise function is defined in Planet.js and prepended to this shader


// Enhanced Fractional Brownian Motion with domain warping
float fbm(vec3 p_scaled_input, float seed_offset) {
    float total = 0.0;
    float current_amplitude = u_fbm_initial_amplitude;
    float current_frequency = 1.0;
    
    // Domain warping for more interesting terrain
    vec3 warp = vec3(
        snoise(p_scaled_input * 0.5 + vec3(seed_offset + 100.0)),
        snoise(p_scaled_input * 0.5 + vec3(seed_offset + 200.0)),
        snoise(p_scaled_input * 0.5 + vec3(seed_offset + 300.0))
    ) * 0.2;
    
    vec3 warped_pos = p_scaled_input + warp;

    for (int i = 0; i < u_fbm_octaves; i++) {
        total += snoise(warped_pos * current_frequency + vec3(seed_offset)) * current_amplitude;
        current_frequency *= u_fbm_lacunarity;
        current_amplitude *= u_fbm_persistence;
    }
    return total;
}

// Generate varied terrain based on position
float generateTerrain(vec3 normalizedPos) {
    vec3 scaledPos = normalizedPos * u_noise_scale;
    
    // Base continent shape using low frequency noise
    float continents = snoise(scaledPos * 0.3 + vec3(u_seed_offset)) * 0.5 + 0.5;
    continents = pow(continents, 2.0); // Make continents more distinct
    
    // Detailed terrain using FBM
    float detail = fbm(scaledPos, u_seed_offset);
    
    // Add tectonic ridges if enabled
    float ridges = 0.0;
    if (u_tectonic_activity > 0.0) {
        ridges = tectonicRidge(normalizedPos, u_noise_scale * 2.0, u_tectonic_activity);
    }
    
    // Combine terrain features
    float height = continents * 0.4 + detail * 0.4 + ridges * 0.2;
    
    // Apply erosion if enabled
    if (u_erosion_factor > 0.0) {
        height = erosion(scaledPos, height, u_erosion_factor);
    }
    
    return height;
}

void main() {
    v_normal = normal;
    v_uv = uv;
    vec3 pos = position;
    vec3 normalizedPos = normalize(pos);

    // Generate complex terrain
    float terrain_height = generateTerrain(normalizedPos) * u_fbm_strength;
    
    // Store raw noise for fragment shader
    v_noise = terrain_height / u_fbm_strength;
    
    // Apply displacement along the normal
    pos = normalizedPos * (u_radius + terrain_height);
    
    v_height = terrain_height; // Pass height (relative to radius) to fragment shader
    v_world_position = (modelMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
