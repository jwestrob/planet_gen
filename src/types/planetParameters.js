// Comprehensive planet parameter schema
export const PlanetParameterSchema = {
  // Terrain parameters
  terrain: {
    noiseScale: { min: 0.1, max: 20, default: 3.5, description: "Base frequency of terrain features" },
    fbmOctaves: { min: 1, max: 10, default: 5, description: "Detail levels in terrain" },
    fbmInitialAmplitude: { min: 0.1, max: 2.0, default: 0.5, description: "Starting amplitude for terrain" },
    fbmLacunarity: { min: 1.5, max: 4.0, default: 2.0, description: "Frequency multiplier between octaves" },
    fbmPersistence: { min: 0.1, max: 0.9, default: 0.5, description: "Amplitude decay between octaves" },
    fbmStrength: { min: 0.05, max: 1.0, default: 0.3, description: "Overall terrain displacement strength" },
    erosionFactor: { min: 0.0, max: 1.0, default: 0.0, description: "Simulated erosion effect" },
    tectonicActivity: { min: 0.0, max: 1.0, default: 0.3, description: "Mountain ridge formation" },
    craterDensity: { min: 0.0, max: 1.0, default: 0.0, description: "Impact crater frequency" }
  },
  
  // Water and atmosphere
  hydrology: {
    waterLevel: { min: 0.0, max: 1.0, default: 0.5, description: "Sea level height" },
    waterColor: { default: "#006994", description: "Ocean color" },
    iceCapExtent: { min: 0.0, max: 0.5, default: 0.1, description: "Polar ice coverage" },
    cloudCoverage: { min: 0.0, max: 1.0, default: 0.3, description: "Cloud density" },
    atmosphereDensity: { min: 0.0, max: 1.0, default: 0.5, description: "Atmospheric thickness" },
    atmosphereTint: { default: "#87CEEB", description: "Sky color tint" }
  },
  
  // Biome and surface
  biomes: {
    vegetationCoverage: { min: 0.0, max: 1.0, default: 0.4, description: "Plant life extent" },
    desertification: { min: 0.0, max: 1.0, default: 0.2, description: "Arid region extent" },
    temperatureRange: { min: -100, max: 100, default: 15, description: "Average surface temp (C)" },
    biomeComplexity: { min: 1, max: 10, default: 5, description: "Number of distinct biomes" }
  },
  
  // Surface materials and colors
  surface: {
    rockColor: { default: "#8B7355", description: "Base rock color" },
    sandColor: { default: "#C19A6B", description: "Desert/beach color" },
    vegetationColor: { default: "#228B22", description: "Plant life color" },
    snowColor: { default: "#FFFFFF", description: "Snow/ice color" },
    volcanoColor: { default: "#8B0000", description: "Volcanic/lava color" },
    surfaceRoughness: { min: 0.0, max: 1.0, default: 0.5, description: "Surface texture detail" }
  },
  
  // Planet characteristics
  planetary: {
    age: { min: 0.1, max: 10.0, default: 4.5, description: "Planet age in billion years" },
    size: { min: 0.5, max: 2.0, default: 1.0, description: "Planet scale multiplier" },
    rotationSpeed: { min: 0.0, max: 2.0, default: 1.0, description: "Day/night cycle speed" },
    axialTilt: { min: 0, max: 45, default: 23.5, description: "Axial tilt in degrees" },
    magneticField: { min: 0.0, max: 1.0, default: 0.5, description: "Magnetic field strength" }
  },
  
  // Aesthetic and style
  style: {
    realism: { min: 0.0, max: 1.0, default: 0.7, description: "Realistic vs stylized" },
    colorSaturation: { min: 0.0, max: 2.0, default: 1.0, description: "Color intensity" },
    detailLevel: { min: 1, max: 10, default: 5, description: "Overall detail quality" }
  }
};

// Helper function to get default parameters
export function getDefaultParameters() {
  const params = {};
  
  // Flatten the schema into a simple parameter object
  Object.entries(PlanetParameterSchema).forEach(([category, properties]) => {
    Object.entries(properties).forEach(([key, config]) => {
      params[key] = config.default;
    });
  });
  
  // Add seed for randomization
  params.seed = Math.random() * 1000;
  
  return params;
}

// Parameter presets for different planet types
export const PlanetPresets = {
  earthLike: {
    name: "Earth-like",
    description: "Habitable world with oceans and continents",
    params: {
      noiseScale: 3.5,
      waterLevel: 0.5,
      fbmOctaves: 5,
      fbmStrength: 0.3,
      vegetationCoverage: 0.7,
      cloudCoverage: 0.4,
      atmosphereDensity: 0.8,
      temperatureRange: 15
    }
  },
  
  desert: {
    name: "Desert World",
    description: "Arid planet with vast sand seas and rocky plateaus",
    params: {
      noiseScale: 8.0,
      waterLevel: 0.1,
      fbmOctaves: 6,
      fbmStrength: 0.4,
      fbmPersistence: 0.6,
      desertification: 0.9,
      vegetationCoverage: 0.05,
      cloudCoverage: 0.1,
      sandColor: "#D2691E",
      rockColor: "#8B4513"
    }
  },
  
  ocean: {
    name: "Ocean World",
    description: "Planet covered in deep oceans with scattered islands",
    params: {
      noiseScale: 12.0,
      waterLevel: 0.85,
      fbmOctaves: 4,
      fbmStrength: 0.2,
      waterColor: "#001F3F",
      cloudCoverage: 0.6,
      atmosphereDensity: 0.9
    }
  },
  
  volcanic: {
    name: "Volcanic World",
    description: "Young planet with active volcanism and lava flows",
    params: {
      noiseScale: 5.0,
      fbmOctaves: 7,
      fbmStrength: 0.5,
      fbmLacunarity: 2.5,
      tectonicActivity: 0.9,
      waterLevel: 0.2,
      volcanoColor: "#FF4500",
      rockColor: "#2F4F4F",
      temperatureRange: 60,
      age: 0.5
    }
  },
  
  ice: {
    name: "Ice World",
    description: "Frozen planet with glaciers and ice sheets",
    params: {
      noiseScale: 6.0,
      waterLevel: 0.3,
      fbmStrength: 0.25,
      iceCapExtent: 0.8,
      snowColor: "#F0F8FF",
      waterColor: "#4682B4",
      temperatureRange: -40,
      cloudCoverage: 0.7
    }
  },
  
  ancient: {
    name: "Ancient World",
    description: "Billions of years old with eroded, smooth terrain",
    params: {
      noiseScale: 10.0,
      fbmOctaves: 3,
      fbmStrength: 0.15,
      fbmPersistence: 0.3,
      erosionFactor: 0.8,
      age: 8.0,
      craterDensity: 0.6,
      vegetationCoverage: 0.1,
      desertification: 0.7
    }
  }
};