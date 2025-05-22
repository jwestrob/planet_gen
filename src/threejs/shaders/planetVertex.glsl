// Standard uniforms for ShaderMaterial in Three.js
// no need to define position, normal, modelMatrix, etc. as they are provided

// Custom uniforms
uniform float u_time;
uniform float u_radius;
uniform float u_noise_scale;
uniform float u_seed_offset; // Use this to vary noise input

// Variables passed to the fragment shader
out float v_height;
out vec3 v_normal;
out vec3 v_world_position;


// Simplex noise function is defined in Planet.js and prepended to this shader


// Basic Fractional Brownian Motion (fBm) for more detailed noise
float fbm(vec3 p, float seed_offset) {
    float total = 0.0;
    float amplitude = 0.5; // Start with half amplitude
    float frequency = 1.0;
    int octaves = 5; // Number of noise layers

    for (int i = 0; i < octaves; i++) {
        total += snoise(p * frequency + vec3(seed_offset)) * amplitude;
        frequency *= 2.0; // Double frequency
        amplitude *= 0.5; // Halve amplitude (persistence)
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
    float terrain_height = displacement * 0.3; // Adjust multiplier for terrain ruggedness
    
    pos = normalize(pos) * (u_radius + terrain_height);
    
    v_height = terrain_height; // Pass height (relative to radius) to fragment shader
    v_world_position = (modelMatrix * vec4(pos, 1.0)).xyz;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
