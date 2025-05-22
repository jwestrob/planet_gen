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

// Variables passed to the fragment shader
out float v_height;
out vec3 v_normal;
out vec3 v_world_position;


// Simplex noise function is defined in Planet.js and prepended to this shader


// Basic Fractional Brownian Motion (fBm) for more detailed noise
float fbm(vec3 p_scaled_input, float seed_offset) { // p_scaled_input is normalize(pos) * u_noise_scale
    float total = 0.0;
    float current_amplitude = u_fbm_initial_amplitude;
    float current_frequency = 1.0; // FBM internal frequency starts at 1.0, p is already scaled by u_noise_scale

    for (int i = 0; i < u_fbm_octaves; i++) {
        total += snoise(p_scaled_input * current_frequency + vec3(seed_offset)) * current_amplitude;
        current_frequency *= u_fbm_lacunarity;
        current_amplitude *= u_fbm_persistence;
    }
    return total;
}

void main() {
    v_normal = normal;
    vec3 pos = position;

    // Calculate noise based on vertex position and scale
    // Add seed_offset to make planets different
    float displacement = fbm(normalize(pos) * u_noise_scale, u_seed_offset);
    
    // Apply displacement along the normal
    // Make displacement more pronounced, ensure it's mostly positive for mountains
    float terrain_height = displacement * u_fbm_strength; // Adjust multiplier for terrain ruggedness
    
    pos = normalize(pos) * (u_radius + terrain_height);
    
    v_height = terrain_height; // Pass height (relative to radius) to fragment shader
    v_world_position = (modelMatrix * vec4(pos, 1.0)).xyz;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
