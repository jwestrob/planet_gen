// Exotic world type definitions with specialized parameters

export const ExoticWorldTypes = {
  lavaWorld: {
    name: "Lava World",
    description: "Molten hellscape with active volcanism",
    icon: "🌋",
    params: {
      waterLevel: 0.0,
      temperatureRange: 800,
      tectonicActivity: 1.0,
      volcanoColor: '#FF0000',
      rockColor: '#2F2F2F',
      sandColor: '#1A1A1A',
      waterColor: '#FF4500', // Lava rivers
      waterDeepColor: '#8B0000',
      snowColor: '#696969',
      vegetationColor: '#000000',
      atmosphereTint: '#FF6600',
      atmosphereDensity: 0.3,
      fbmStrength: 0.4,
      fbmOctaves: 8,
      noiseScale: 6.0,
      cloudCoverage: 0.1,
      erosionFactor: 0.2,
      surfaceEmission: 0.8, // Glowing effect
      lavaFlows: 1.0,
      thermalVents: 1.0
    }
  },

  iceWorld: {
    name: "Ice World",
    description: "Frozen planet with glacial formations",
    icon: "🧊",
    params: {
      waterLevel: 0.3,
      temperatureRange: -80,
      iceCapExtent: 0.9,
      waterColor: '#4682B4',
      waterDeepColor: '#191970',
      rockColor: '#708090',
      sandColor: '#F0F8FF',
      snowColor: '#FFFFFF',
      vegetationColor: '#2F4F4F',
      volcanoColor: '#4169E1',
      atmosphereTint: '#B0E0E6',
      atmosphereDensity: 0.6,
      fbmStrength: 0.25,
      noiseScale: 8.0,
      cloudCoverage: 0.7,
      erosionFactor: 0.6,
      glacialFlow: 1.0,
      cryovolcanism: 0.3
    }
  },

  tholinWorld: {
    name: "Tholin World",
    description: "Organic haze-covered world like Titan",
    icon: "🟤",
    params: {
      waterLevel: 0.4,
      temperatureRange: -180,
      waterColor: '#8B4513', // Hydrocarbon lakes
      waterDeepColor: '#654321',
      rockColor: '#D2691E',
      sandColor: '#DEB887',
      snowColor: '#F5DEB3',
      vegetationColor: '#B8860B',
      volcanoColor: '#A0522D',
      atmosphereTint: '#D2691E',
      atmosphereDensity: 1.0,
      fbmStrength: 0.2,
      noiseScale: 12.0,
      cloudCoverage: 0.9,
      erosionFactor: 0.4,
      organicHaze: 1.0,
      hydrocarbonLakes: 1.0
    }
  },

  gasGiantMoon: {
    name: "Gas Giant Moon",
    description: "Tidally locked moon with extreme geology",
    icon: "🌙",
    params: {
      waterLevel: 0.1,
      temperatureRange: -120,
      tectonicActivity: 0.9,
      waterColor: '#483D8B',
      waterDeepColor: '#2F2F4F',
      rockColor: '#696969',
      sandColor: '#A9A9A9',
      snowColor: '#F5F5F5',
      vegetationColor: '#4B0082',
      volcanoColor: '#FF69B4',
      atmosphereTint: '#9932CC',
      atmosphereDensity: 0.1,
      fbmStrength: 0.6,
      fbmOctaves: 10,
      noiseScale: 4.0,
      erosionFactor: 0.3,
      tidalHeating: 1.0,
      radiationExposure: 0.8
    }
  },

  desertWorld: {
    name: "Desert World",
    description: "Arid planet with vast sand seas",
    icon: "🏜️",
    params: {
      waterLevel: 0.05,
      temperatureRange: 45,
      desertification: 1.0,
      vegetationCoverage: 0.0,
      waterColor: '#CD853F',
      waterDeepColor: '#8B7355',
      rockColor: '#D2691E',
      sandColor: '#F4A460',
      snowColor: '#F5DEB3',
      vegetationColor: '#8B4513',
      volcanoColor: '#B22222',
      atmosphereTint: '#DEB887',
      atmosphereDensity: 0.4,
      fbmStrength: 0.3,
      noiseScale: 15.0,
      cloudCoverage: 0.1,
      erosionFactor: 0.8,
      sandDunes: 1.0,
      dustStorms: 0.7
    }
  },

  carbonWorld: {
    name: "Carbon World",
    description: "Diamond and graphite rich planet",
    icon: "💎",
    params: {
      waterLevel: 0.0,
      temperatureRange: 200,
      waterColor: '#2F2F2F',
      waterDeepColor: '#000000',
      rockColor: '#1C1C1C',
      sandColor: '#404040',
      snowColor: '#C0C0C0',
      vegetationColor: '#2F4F2F',
      volcanoColor: '#4169E1',
      atmosphereTint: '#696969',
      atmosphereDensity: 0.2,
      fbmStrength: 0.5,
      noiseScale: 8.0,
      tectonicActivity: 0.4,
      erosionFactor: 0.1,
      carbonDeposits: 1.0,
      diamondFormations: 0.6
    }
  },

  waterWorld: {
    name: "Water World",
    description: "Ocean planet with floating continents",
    icon: "🌊",
    params: {
      waterLevel: 0.9,
      temperatureRange: 25,
      vegetationCoverage: 0.8,
      waterColor: '#006994',
      waterDeepColor: '#001F3F',
      rockColor: '#20B2AA',
      sandColor: '#F0E68C',
      snowColor: '#F0FFFF',
      vegetationColor: '#00FA9A',
      volcanoColor: '#FF4500',
      atmosphereTint: '#87CEEB',
      atmosphereDensity: 0.9,
      fbmStrength: 0.2,
      noiseScale: 20.0,
      cloudCoverage: 0.6,
      erosionFactor: 0.9,
      oceanCurrents: 1.0,
      coralReefs: 0.8
    }
  },

  crystalWorld: {
    name: "Crystal World",
    description: "Crystalline formations and mineral deposits",
    icon: "💠",
    params: {
      waterLevel: 0.2,
      temperatureRange: -40,
      waterColor: '#40E0D0',
      waterDeepColor: '#008B8B',
      rockColor: '#9370DB',
      sandColor: '#DDA0DD',
      snowColor: '#E6E6FA',
      vegetationColor: '#8A2BE2',
      volcanoColor: '#FF1493',
      atmosphereTint: '#DA70D6',
      atmosphereDensity: 0.5,
      fbmStrength: 0.4,
      noiseScale: 6.0,
      tectonicActivity: 0.3,
      erosionFactor: 0.2,
      crystallineFormations: 1.0,
      mineralDeposits: 0.9
    }
  },

  toxicWorld: {
    name: "Toxic World",
    description: "Poisonous atmosphere with acid rain",
    icon: "☠️",
    params: {
      waterLevel: 0.3,
      temperatureRange: 90,
      vegetationCoverage: 0.1,
      waterColor: '#ADFF2F', // Acid green
      waterDeepColor: '#8FBC8F',
      rockColor: '#556B2F',
      sandColor: '#9ACD32',
      snowColor: '#F5FFFA',
      vegetationColor: '#6B8E23',
      volcanoColor: '#FF8C00',
      atmosphereTint: '#ADFF2F',
      atmosphereDensity: 1.0,
      fbmStrength: 0.3,
      noiseScale: 10.0,
      cloudCoverage: 0.8,
      erosionFactor: 0.7,
      acidRain: 1.0,
      toxicGases: 0.9
    }
  }
};

// Function to get exotic world parameters
export function getExoticWorldParams(worldType) {
  const worldData = ExoticWorldTypes[worldType];
  if (!worldData) return null;
  
  return {
    ...worldData.params,
    seed: Math.random() * 1000,
    worldType: worldType
  };
}

// Function to detect world type from parameters
export function detectWorldType(params) {
  // Simple heuristics to determine world type
  if (params.temperatureRange > 500) return 'lavaWorld';
  if (params.temperatureRange < -50 && params.iceCapExtent > 0.7) return 'iceWorld';
  if (params.waterLevel > 0.8) return 'waterWorld';
  if (params.desertification > 0.8) return 'desertWorld';
  if (params.atmosphereDensity > 0.9 && params.cloudCoverage > 0.8) return 'tholinWorld';
  
  return 'earthLike';
}