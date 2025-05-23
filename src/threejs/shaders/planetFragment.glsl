// Custom uniforms
uniform float u_water_level;
uniform vec3 u_water_color;
uniform vec3 u_water_deep_color;
uniform vec3 u_sand_color;
uniform vec3 u_grass_color;
uniform vec3 u_rock_color;
uniform vec3 u_snow_color;
uniform float u_ice_cap_extent;
uniform float u_vegetation_coverage;
uniform float u_desert_amount;
uniform float u_temperature;

// Exotic world parameters
uniform float u_surface_emission;
uniform float u_lava_flows;
uniform float u_organic_haze;
uniform float u_crystalline_formations;
uniform float u_acid_rain;
uniform float u_surface_roughness;

// Terrain type thresholds
uniform float u_beach_height;
uniform float u_grass_height;
uniform float u_rock_height;
uniform float u_snow_height;

// Variables from vertex shader
in float v_height; // Height from vertex shader (relative to radius)
in vec3 v_normal;
in vec3 v_world_position;
in vec2 v_uv;
in float v_noise;

// Lighting
vec3 sunDir = normalize(vec3(1.0, 0.8, 0.6));
vec3 skyLight = vec3(0.5, 0.7, 1.0);

out vec4 out_FragColor;

// Helper functions
float remap(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 triplanarTexture(vec3 worldPos, vec3 normal) {
    // Simple noise-based texture variation
    float scale = 20.0;
    vec3 blending = abs(normal);
    blending = normalize(max(blending, 0.00001));
    float b = blending.x + blending.y + blending.z;
    blending /= b;
    
    float xPattern = sin(worldPos.y * scale) * sin(worldPos.z * scale) * 0.1;
    float yPattern = sin(worldPos.x * scale) * sin(worldPos.z * scale) * 0.1;
    float zPattern = sin(worldPos.x * scale) * sin(worldPos.y * scale) * 0.1;
    
    return vec3(xPattern * blending.x + yPattern * blending.y + zPattern * blending.z);
}

void main() {
    vec3 color;
    float adjusted_water_level = u_water_level - 0.5;
    
    // Calculate latitude for ice caps
    float latitude = abs(v_world_position.y / length(v_world_position));
    bool inIceCap = latitude > (1.0 - u_ice_cap_extent);
    
    // Temperature-based adjustments
    float tempFactor = clamp(remap(u_temperature, -50.0, 50.0, 0.0, 1.0), 0.0, 1.0);
    
    // Get texture variation
    vec3 texVariation = triplanarTexture(v_world_position * 10.0, v_normal);
    
    // Biome determination with smooth transitions
    if (v_height < adjusted_water_level) {
        // Water depth gradient
        float waterDepth = clamp((adjusted_water_level - v_height) / 0.2, 0.0, 1.0);
        color = mix(u_water_color, u_water_deep_color, waterDepth);
        
        // Add wave-like variation
        color += texVariation * 0.05;
    } else if (v_height < adjusted_water_level + u_beach_height) {
        // Beach/shore transition
        float beachFactor = (v_height - adjusted_water_level) / u_beach_height;
        vec3 wetSand = mix(u_sand_color, u_water_color, 0.2);
        color = mix(wetSand, u_sand_color, beachFactor);
    } else if (v_height < u_grass_height || inIceCap) {
        if (inIceCap) {
            // Ice cap regions
            color = u_snow_color;
            color += texVariation * 0.1;
        } else {
            // Lowlands - blend between vegetation and desert based on parameters
            float vegetationNoise = v_noise * 0.5 + 0.5;
            float localVegetation = u_vegetation_coverage * vegetationNoise * tempFactor;
            float localDesert = u_desert_amount * (1.0 - vegetationNoise) * (1.0 - tempFactor * 0.5);
            
            vec3 baseColor = u_rock_color;
            color = mix(baseColor, u_grass_color, localVegetation);
            color = mix(color, u_sand_color, localDesert);
            
            // Add texture detail
            color += texVariation * 0.15;
        }
    } else if (v_height < u_rock_height) {
        // Rocky/mountainous regions
        float rockFactor = (v_height - u_grass_height) / (u_rock_height - u_grass_height);
        vec3 darkRock = u_rock_color * 0.7;
        color = mix(u_rock_color, darkRock, rockFactor);
        
        // Less vegetation at higher altitudes
        float altitudeVegetation = u_vegetation_coverage * (1.0 - rockFactor) * 0.3;
        color = mix(color, u_grass_color * 0.7, altitudeVegetation);
        
        // Rock texture variation
        color += texVariation * 0.2;
    } else {
        // Snow caps
        color = u_snow_color;
        float snowVariation = v_noise * 0.1 + 0.9;
        color *= snowVariation;
        
        // Slight blue tint in shadows
        color = mix(color, vec3(0.85, 0.9, 1.0), 0.1);
    }
    
    // Advanced lighting
    vec3 normal = normalize(v_normal);
    
    // Diffuse lighting
    float NdotL = max(0.0, dot(normal, sunDir));
    vec3 diffuse = color * NdotL;
    
    // Ambient with hemisphere lighting
    float skyFactor = normal.y * 0.5 + 0.5;
    vec3 ambient = color * mix(vec3(0.3, 0.25, 0.2), skyLight, skyFactor) * 0.4;
    
    // Specular for water
    vec3 viewDir = normalize(cameraPosition - v_world_position);
    if (v_height < adjusted_water_level) {
        vec3 halfDir = normalize(sunDir + viewDir);
        float spec = pow(max(0.0, dot(normal, halfDir)), 32.0);
        diffuse += vec3(1.0) * spec * 0.5;
    }
    
    // Combine lighting
    vec3 final_color = ambient + diffuse;
    
    // Exotic world effects
    
    // Lava glow for hot worlds
    if (u_surface_emission > 0.0 && u_temperature > 200.0) {
        float hotSpots = smoothstep(0.3, 0.7, v_noise) * u_lava_flows;
        vec3 emissionColor = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 1.0, 0.0), hotSpots);
        final_color += emissionColor * u_surface_emission * hotSpots;
    }
    
    // Crystalline formations
    if (u_crystalline_formations > 0.0) {
        float crystalPattern = smoothstep(0.6, 0.8, abs(sin(v_world_position.x * 20.0) * sin(v_world_position.y * 20.0) * sin(v_world_position.z * 20.0)));
        vec3 crystalColor = vec3(0.5, 0.8, 1.0) * crystalPattern * u_crystalline_formations;
        final_color += crystalColor * 0.3;
        
        // Crystal specular highlights
        if (crystalPattern > 0.5) {
            vec3 reflectDir = reflect(-sunDir, normal);
            float spec = pow(max(0.0, dot(viewDir, reflectDir)), 64.0);
            final_color += vec3(1.0) * spec * u_crystalline_formations;
        }
    }
    
    // Organic haze tint for tholin worlds
    if (u_organic_haze > 0.0) {
        vec3 tholinTint = vec3(0.8, 0.6, 0.4);
        final_color = mix(final_color, final_color * tholinTint, u_organic_haze * 0.3);
    }
    
    // Acid corrosion effects
    if (u_acid_rain > 0.0) {
        float corrosion = smoothstep(0.2, 0.8, v_noise + sin(v_world_position.x * 15.0) * 0.1);
        vec3 acidColor = vec3(0.7, 1.0, 0.3);
        final_color = mix(final_color, acidColor, corrosion * u_acid_rain * 0.2);
    }
    
    // Surface roughness affects lighting
    float roughnessFactor = 1.0 - u_surface_roughness * 0.3;
    final_color *= roughnessFactor;
    
    // Atmospheric fog with exotic tinting
    float distance = length(cameraPosition - v_world_position);
    float fogFactor = exp(-distance * 0.1);
    vec3 fogColor = skyLight * 0.8;
    
    // Tint fog based on exotic properties
    if (u_organic_haze > 0.0) {
        fogColor = mix(fogColor, vec3(0.8, 0.6, 0.4), u_organic_haze * 0.5);
    }
    if (u_surface_emission > 0.0) {
        fogColor = mix(fogColor, vec3(1.0, 0.5, 0.2), u_surface_emission * 0.3);
    }
    
    final_color = mix(fogColor, final_color, fogFactor);
    
    out_FragColor = vec4(final_color, 1.0);
}
