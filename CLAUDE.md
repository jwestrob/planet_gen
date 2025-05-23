# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build production**: `npm run build`
- **Lint code**: `npm run lint`
- **Preview build**: `npm run preview`

## Project Architecture

This is a comprehensive procedural planet generator built with Three.js and React. The project generates realistic 3D planets with advanced terrain, atmospheric effects, and exotic world types using sophisticated shader-based rendering.

### Core Structure

- **Three.js Rendering Layer** (`src/threejs/`):
  - `Planet.js`: Main planet class with comprehensive shader uniforms for terrain, colors, and exotic effects
  - `Atmosphere.js`: Atmospheric scattering and rim lighting effects
  - `sceneManager.js`: Scene setup, lighting, camera controls, and animation loop
  - `shaders/`: Advanced GLSL shaders for terrain generation and exotic materials
    - `planetVertex.glsl`: Advanced terrain generation with domain warping, continents, and tectonic features
    - `planetFragment.glsl`: Sophisticated biome rendering with exotic effects (lava glow, crystalline formations, etc.)
    - `terrainFunctions.glsl`: Advanced terrain algorithms (ridges, erosion, craters)

- **React UI Layer** (`src/components/`):
  - `PlanetCanvas.jsx`: Three.js integration with React
  - `PromptInterface.jsx`: Natural language planet generation with keyword matching
  - `ColorPalette.jsx`: Comprehensive color control system with presets
  - `AdvancedControls.jsx`: Exotic world types and environmental parameters
  - `Controls.jsx`: Basic FBM and terrain parameters
  - `GenerationStatus.jsx`: Visual feedback for planet generation
  - `App.jsx`: Main application state and parameter management

- **Data Layer** (`src/types/`, `src/services/`):
  - `planetParameters.js`: Comprehensive parameter schema and default values
  - `exoticWorlds.js`: Specialized world type definitions (lava, ice, tholin, etc.)
  - `promptToParameters.js`: Keyword-based natural language processing

### Key Technical Features

- **Advanced Terrain Generation**: 
  - Domain warping for natural terrain variation
  - Continental plate simulation with low-frequency noise
  - Tectonic ridge generation for mountain chains
  - Erosion simulation and crater generation
  - Multi-layered FBM with configurable parameters

- **Exotic Material System**:
  - Lava glow with emission mapping for hot worlds
  - Crystalline formations with procedural patterns and specular highlights
  - Organic haze tinting for tholin worlds (Titan-like)
  - Acid corrosion effects with procedural wear patterns
  - Surface roughness affecting lighting properties

- **Atmospheric Effects**:
  - Atmospheric scattering with additive blending
  - Fog effects with exotic tinting based on world properties
  - Dynamic atmospheric density and composition

- **Color System**:
  - Full RGB control for all surface materials
  - Preset palette system with 6 themed collections
  - Real-time color updates via shader uniforms
  - Categorized color controls (Water, Surface, Special, Atmosphere)

### Natural Language Interface

The system includes keyword-based natural language processing that maps descriptive text to planet parameters:

- **Keyword Matching**: Analyzes input text for recognized terms (e.g., "lava", "crystal", "toxic")
- **Parameter Mapping**: Each keyword maps to specific parameter changes
- **Combination Logic**: Multiple keywords combine to create complex worlds
- **Example**: "frozen crystal world" → sets ice parameters + crystalline formations

**Note**: This is keyword matching, not full LLM integration. For true LLM integration, implement API calls to external language models.

### Parameter Flow

1. User input via PromptInterface, ColorPalette, or AdvancedControls
2. Parameters flow through App.jsx state management
3. PlanetCanvas.jsx receives updates and calls sceneManager
4. Planet.js updates shader uniforms for terrain and materials
5. Atmosphere.js updates atmospheric effects
6. GLSL shaders regenerate visuals in real-time

### Exotic World Types

The system supports 9 specialized world types with unique characteristics:

- 🌋 **Lava World**: Molten surfaces with glowing emission
- 🧊 **Ice World**: Frozen landscapes with glacial effects
- 🟤 **Tholin World**: Organic haze like Titan
- 🌙 **Gas Giant Moon**: Tidally locked with extreme geology
- 🏜️ **Desert World**: Vast sand seas and erosion
- 💎 **Crystal World**: Crystalline formations with specular lighting
- 🌊 **Water World**: Ocean planets with floating continents
- ☠️ **Toxic World**: Acid rain and corrosive atmospheres
- 💠 **Carbon World**: Diamond and graphite formations

### Adding New Features

When extending the system:

1. **New Parameters**: Add to `planetParameters.js` schema
2. **Shader Effects**: Update fragment shader and add uniforms to `Planet.js`
3. **UI Controls**: Add to appropriate component (ColorPalette, AdvancedControls, etc.)
4. **World Types**: Define in `exoticWorlds.js` with parameter sets
5. **Keywords**: Add to `promptToParameters.js` for natural language support

### Performance Notes

- Shader compilation happens once at startup
- Real-time parameter updates via uniform changes (very fast)
- IcosahedronGeometry with 64 subdivisions balances quality and performance
- Atmospheric effects use separate mesh with additive blending