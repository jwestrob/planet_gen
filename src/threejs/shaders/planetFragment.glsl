#version 300 es

// Custom uniforms
uniform float u_water_level;
// Add uniforms for colors:
// uniform vec3 u_color_deep_water;
// uniform vec3 u_color_land;
// uniform vec3 u_color_snow;

// Variables from vertex shader
in float v_height; // Height from vertex shader (relative to radius)
in vec3 v_normal;
in vec3 v_world_position;

// Basic lighting (view direction, light direction)
// For simplicity, let's assume a directional light from a fixed point.
vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));

out vec4 out_FragColor;
void main() {
    vec3 color;
    float adjusted_water_level = u_water_level - 0.5; // Adjust as 0 is average radius

    // Simple biome coloring based on height
    if (v_height < adjusted_water_level) {
        color = vec3(0.1, 0.3, 0.7); // Deep water
    } else if (v_height < adjusted_water_level + 0.02) {
        color = vec3(0.2, 0.5, 0.8); // Shallows
    } else if (v_height < 0.2) {
        color = vec3(0.2, 0.6, 0.1); // Low land / Grass
    } else if (v_height < 0.35) {
        color = vec3(0.4, 0.3, 0.1); // Mountains / Rock
    } else {
        color = vec3(0.95, 0.95, 1.0); // Snow caps
    }

    // Basic Lambertian diffuse lighting
    float diffuse = max(0.0, dot(normalize(v_normal), lightDir));
    vec3 final_color = color * (0.4 + diffuse * 0.6); // Ambient 0.4, Diffuse 0.6

    // Atmosphere attempt: simple rim lighting
    vec3 viewDir = normalize(cameraPosition - v_world_position);
    float rim = 1.0 - dot(viewDir, normalize(v_normal));
    rim = smoothstep(0.4, 1.0, rim); // Adjust rim effect falloff
    vec3 atmosphereColor = vec3(0.5, 0.7, 1.0) * pow(rim, 3.0) * 0.6; // Blueish atmosphere, adjust power and intensity

    out_FragColor = vec4(final_color + atmosphereColor, 1.0);
}
