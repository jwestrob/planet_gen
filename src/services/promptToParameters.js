import { getDefaultParameters, PlanetParameterSchema } from '../types/planetParameters';

// Mock LLM service that converts natural language to planet parameters
// In production, this would call an actual LLM API

// Keyword mappings for different planet characteristics
const keywordMappings = {
  // Age-related keywords
  ancient: { age: 8.0, erosionFactor: 0.8, fbmOctaves: 3, craterDensity: 0.5 },
  old: { age: 6.0, erosionFactor: 0.6, fbmOctaves: 4 },
  young: { age: 1.0, erosionFactor: 0.1, tectonicActivity: 0.8, fbmOctaves: 7 },
  primordial: { age: 0.5, tectonicActivity: 0.9, volcanoColor: "#FF6347" },
  
  // Terrain keywords
  mountainous: { fbmStrength: 0.6, fbmOctaves: 7, tectonicActivity: 0.7 },
  flat: { fbmStrength: 0.1, fbmOctaves: 2, erosionFactor: 0.9 },
  rugged: { fbmStrength: 0.5, fbmPersistence: 0.7, surfaceRoughness: 0.8 },
  smooth: { fbmStrength: 0.2, fbmPersistence: 0.3, surfaceRoughness: 0.2 },
  canyon: { fbmStrength: 0.4, noiseScale: 15.0, fbmLacunarity: 2.5 },
  
  // Water keywords
  ocean: { waterLevel: 0.8, waterColor: "#006994" },
  sea: { waterLevel: 0.7, waterColor: "#4682B4" },
  lake: { waterLevel: 0.4 },
  dry: { waterLevel: 0.1, desertification: 0.8 },
  arid: { waterLevel: 0.15, desertification: 0.7, cloudCoverage: 0.1 },
  archipelago: { waterLevel: 0.75, noiseScale: 12.0 },
  
  // Climate keywords
  frozen: { temperatureRange: -50, iceCapExtent: 0.7, snowColor: "#F0FFFF" },
  ice: { temperatureRange: -30, iceCapExtent: 0.5, waterColor: "#B0E0E6" },
  cold: { temperatureRange: -10, iceCapExtent: 0.3 },
  hot: { temperatureRange: 40, desertification: 0.6, vegetationCoverage: 0.2 },
  temperate: { temperatureRange: 15, vegetationCoverage: 0.6 },
  tropical: { temperatureRange: 25, vegetationCoverage: 0.8, cloudCoverage: 0.6 },
  
  // Atmosphere keywords
  toxic: { atmosphereTint: "#90EE90", atmosphereDensity: 0.9, vegetationCoverage: 0.0 },
  thick: { atmosphereDensity: 0.9, cloudCoverage: 0.7 },
  thin: { atmosphereDensity: 0.2, cloudCoverage: 0.1 },
  clear: { cloudCoverage: 0.1, atmosphereDensity: 0.3 },
  cloudy: { cloudCoverage: 0.8 },
  stormy: { cloudCoverage: 0.9, atmosphereDensity: 0.8 },
  
  // Surface keywords
  desert: { desertification: 0.9, sandColor: "#DEB887", vegetationCoverage: 0.05 },
  sand: { sandColor: "#F4A460", desertification: 0.7 },
  rock: { rockColor: "#708090", desertification: 0.5 },
  volcanic: { volcanoColor: "#DC143C", tectonicActivity: 0.8, temperatureRange: 50 },
  lava: { volcanoColor: "#FF4500", waterLevel: 0.1, temperatureRange: 80 },
  forest: { vegetationCoverage: 0.8, vegetationColor: "#228B22" },
  jungle: { vegetationCoverage: 0.9, vegetationColor: "#006400", cloudCoverage: 0.7 },
  
  // Color keywords
  red: { rockColor: "#CD5C5C", sandColor: "#E9967A" },
  blue: { waterColor: "#4169E1", atmosphereTint: "#87CEEB" },
  green: { vegetationColor: "#32CD32", vegetationCoverage: 0.6 },
  purple: { atmosphereTint: "#9370DB", rockColor: "#8B7D8B" },
  rust: { rockColor: "#B22222", sandColor: "#A0522D" },
  golden: { sandColor: "#FFD700", rockColor: "#DAA520" },
  
  // Size keywords
  large: { size: 1.5, noiseScale: 8.0 },
  small: { size: 0.7, noiseScale: 4.0 },
  massive: { size: 2.0, noiseScale: 10.0 },
  tiny: { size: 0.5, noiseScale: 3.0 },
  
  // Exotic world keywords
  lava: { temperatureRange: 600, surfaceEmission: 0.8, lavaFlows: 1.0, volcanoColor: '#FF0000', rockColor: '#2F2F2F' },
  molten: { temperatureRange: 800, surfaceEmission: 1.0, lavaFlows: 1.0, tectonicActivity: 1.0 },
  crystal: { crystallineFormations: 1.0, rockColor: '#9370DB', surfaceRoughness: 0.2 },
  crystalline: { crystallineFormations: 0.8, rockColor: '#8A2BE2', atmosphereTint: '#DA70D6' },
  toxic: { acidRain: 0.8, atmosphereTint: '#ADFF2F', waterColor: '#ADFF2F', vegetationCoverage: 0.1 },
  acid: { acidRain: 1.0, waterColor: '#ADFF2F', erosionFactor: 0.8 },
  tholin: { organicHaze: 1.0, atmosphereTint: '#D2691E', cloudCoverage: 0.9, temperatureRange: -180 },
  organic: { organicHaze: 0.6, atmosphereTint: '#DEB887', cloudCoverage: 0.7 },
  diamond: { crystallineFormations: 0.9, rockColor: '#E0E0E0', surfaceRoughness: 0.1 },
  carbon: { rockColor: '#2F2F2F', sandColor: '#404040', temperatureRange: 200 },
  tidally: { tectonicActivity: 0.9, temperatureRange: -120, erosionFactor: 0.3 },
  locked: { tectonicActivity: 0.9, temperatureRange: -120 },
  moon: { size: 0.6, craterDensity: 0.7, atmosphereDensity: 0.1 },
  hellish: { temperatureRange: 500, surfaceEmission: 0.7, acidRain: 0.5, atmosphereTint: '#FF6600' },
  paradise: { temperatureRange: 22, vegetationCoverage: 0.9, waterLevel: 0.6, cloudCoverage: 0.5 },
  barren: { waterLevel: 0.0, vegetationCoverage: 0.0, craterDensity: 0.8, erosionFactor: 0.9 },
  lifeless: { vegetationCoverage: 0.0, atmosphereDensity: 0.1, craterDensity: 0.6 }
};

// Analyze prompt and extract parameters
export function analyzePrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const params = getDefaultParameters();
  
  // Track which categories have been modified to avoid conflicts
  const modifiedCategories = new Set();
  
  // Apply keyword mappings
  Object.entries(keywordMappings).forEach(([keyword, mappings]) => {
    if (lowerPrompt.includes(keyword)) {
      Object.entries(mappings).forEach(([param, value]) => {
        params[param] = value;
        
        // Track which category this parameter belongs to
        Object.entries(PlanetParameterSchema).forEach(([category, properties]) => {
          if (param in properties) {
            modifiedCategories.add(category);
          }
        });
      });
    }
  });
  
  // Adjust parameters based on combinations
  if (lowerPrompt.includes('earth-like') || lowerPrompt.includes('habitable')) {
    params.waterLevel = 0.5;
    params.vegetationCoverage = 0.6;
    params.temperatureRange = 15;
    params.atmosphereDensity = 0.7;
    params.cloudCoverage = 0.4;
  }
  
  if (lowerPrompt.includes('mars-like') || lowerPrompt.includes('martian')) {
    params.rockColor = '#CD853F';
    params.sandColor = '#D2691E';
    params.atmosphereTint = '#FFE4B5';
    params.atmosphereDensity = 0.1;
    params.waterLevel = 0.05;
    params.iceCapExtent = 0.2;
  }
  
  // Adjust noise scale based on feature descriptions
  if (lowerPrompt.includes('detailed') || lowerPrompt.includes('complex')) {
    params.fbmOctaves = Math.min(params.fbmOctaves + 2, 10);
    params.detailLevel = 8;
  }
  
  if (lowerPrompt.includes('simple') || lowerPrompt.includes('minimal')) {
    params.fbmOctaves = Math.max(params.fbmOctaves - 2, 2);
    params.detailLevel = 3;
  }
  
  // Add some controlled randomness for variety
  params.seed = Math.random() * 1000;
  
  // Slightly randomize some parameters for natural variation
  params.noiseScale *= (0.8 + Math.random() * 0.4);
  params.fbmStrength *= (0.9 + Math.random() * 0.2);
  
  return params;
}

// Mock async function to simulate LLM API call
export async function generatePlanetFromPrompt(prompt) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In production, this would be:
  // const response = await fetch('/api/generate-planet', {
  //   method: 'POST',
  //   body: JSON.stringify({ prompt }),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // return response.json();
  
  return analyzePrompt(prompt);
}

// Function to prepare for future LLM integration
export function createLLMPrompt(userPrompt) {
  return `Given the following planet description: "${userPrompt}"
  
Generate planet parameters for a procedural generation system. Consider:
- Terrain characteristics (roughness, feature scale, complexity)
- Water presence and distribution
- Climate and temperature
- Atmospheric properties
- Surface colors and materials
- Geological age and erosion
- Vegetation coverage
- Any special features mentioned

Provide specific numeric values for procedural generation parameters.`;
}

// Function to validate and sanitize parameters
export function validateParameters(params) {
  const validated = { ...params };
  
  // Ensure all parameters are within valid ranges
  Object.entries(PlanetParameterSchema).forEach(([category, properties]) => {
    Object.entries(properties).forEach(([key, config]) => {
      if (key in validated && typeof config.min !== 'undefined') {
        validated[key] = Math.max(config.min, Math.min(config.max, validated[key]));
      }
    });
  });
  
  return validated;
}