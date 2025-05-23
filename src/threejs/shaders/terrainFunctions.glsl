// Advanced terrain generation functions

// Ridge noise for mountain chains
float ridgeNoise(vec3 p, float seed) {
    float n = abs(snoise(p + vec3(seed)));
    n = 1.0 - n;
    n = n * n;
    return n;
}

// Turbulence function for rough terrain
float turbulence(vec3 p, float seed, int octaves) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float maxValue = 0.0;
    
    for (int i = 0; i < octaves; i++) {
        value += abs(snoise(p * frequency + vec3(seed))) * amplitude;
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    
    return value / maxValue;
}

// Continental shelf function
float continentalShelf(float height, float waterLevel, float shelfWidth) {
    if (height > waterLevel) return height;
    
    float depth = waterLevel - height;
    float shelfFactor = smoothstep(0.0, shelfWidth, depth);
    return mix(height, height - depth * 0.3, shelfFactor);
}

// Erosion simulation
float erosion(vec3 p, float height, float erosionStrength) {
    float slope = length(vec3(
        snoise(p + vec3(0.01, 0.0, 0.0)) - snoise(p - vec3(0.01, 0.0, 0.0)),
        0.0,
        snoise(p + vec3(0.0, 0.0, 0.01)) - snoise(p - vec3(0.0, 0.0, 0.01))
    )) * 50.0;
    
    float erosionFactor = smoothstep(0.0, 1.0, slope * erosionStrength);
    return height - erosionFactor * 0.1;
}

// Crater generation
float crater(vec3 p, vec3 craterPos, float radius, float rimHeight) {
    float dist = distance(p, craterPos);
    if (dist > radius * 1.5) return 0.0;
    
    float crater = 0.0;
    if (dist < radius) {
        // Bowl shape
        float bowlDepth = sqrt(1.0 - (dist / radius) * (dist / radius));
        crater = -bowlDepth * 0.3;
    } else {
        // Rim
        float rimDist = (dist - radius) / (radius * 0.5);
        crater = rimHeight * exp(-rimDist * rimDist * 3.0);
    }
    
    return crater;
}

// Tectonic ridges
float tectonicRidge(vec3 p, float scale, float height) {
    vec3 p1 = p * scale;
    float ridge1 = ridgeNoise(p1, 0.0);
    float ridge2 = ridgeNoise(p1 * 0.5 + vec3(100.0), 13.7);
    
    float ridges = ridge1 * 0.7 + ridge2 * 0.3;
    return ridges * height;
}