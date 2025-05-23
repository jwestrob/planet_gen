# Procedural Planet Generator

## Overview

This is a comprehensive procedural planet generator built with Three.js and React, capable of creating realistic and exotic planetary worlds with advanced shader-based rendering. The system combines sophisticated terrain generation, atmospheric effects, and a natural language interface to create visually stunning and scientifically-inspired planets.

## ✨ Key Features

### 🌍 **Advanced Terrain Generation**
- **Fractional Brownian Motion (FBM)** with configurable parameters
- **Domain warping** for natural terrain variation
- **Continental plate simulation** using low-frequency noise
- **Tectonic ridge generation** for realistic mountain chains
- **Erosion simulation** and impact crater generation
- **Multi-layered noise** combining different scales and effects

### 🎨 **Comprehensive Customization**
- **Full color control** for all surface materials (water, rock, sand, vegetation, snow, lava)
- **6 preset color palettes** (Earth-like, Mars-like, Alien Desert, Frozen World, Lava World, Tholin World)
- **Real-time parameter adjustment** with immediate visual feedback
- **Advanced atmospheric controls** (density, composition, tinting)

### 🚀 **Exotic World Types**
- 🌋 **Lava World** - Molten hellscape with glowing surfaces
- 🧊 **Ice World** - Frozen planet with glacial formations
- 🟤 **Tholin World** - Organic haze-covered world (like Titan)
- 🌙 **Gas Giant Moon** - Tidally locked with extreme geology
- 🏜️ **Desert World** - Vast sand seas and dust storms
- 💎 **Crystal World** - Crystalline formations with specular highlights
- 🌊 **Water World** - Ocean planet with floating continents
- ☠️ **Toxic World** - Acid rain and poisonous atmosphere
- 💠 **Carbon World** - Diamond and graphite formations

### 🗣️ **Natural Language Interface**
- **Keyword-based planet generation** from descriptive text
- **Example prompts**: "frozen crystal world with purple atmosphere", "molten lava planet with toxic gases"
- **Intelligent parameter mapping** that combines multiple environmental factors
- **Pre-built example prompts** for inspiration

### 🌟 **Advanced Visual Effects**
- **Atmospheric scattering** with rim lighting effects
- **Lava glow** with emission mapping for hot worlds
- **Crystalline formations** with procedural patterns
- **Organic haze tinting** for exotic atmospheres
- **Acid corrosion effects** with wear patterns
- **Dynamic lighting** with hemisphere ambient and directional sun light

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/planet-gen.git
   cd planet-gen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the local address (usually http://localhost:5173)

## 🎮 How to Use

### Natural Language Generation
1. Use the **"Describe Your Planet"** text area
2. Enter descriptions like:
   - "Ancient desert planet with deep canyons"
   - "Frozen moon with subsurface oceans"
   - "Volcanic world with toxic atmosphere"
3. Click **"Generate Planet"** to apply the description

### Manual Customization
1. **Color Palette**: Click "🎨 Show Color Palette" to access full color controls
2. **Advanced Controls**: Click "⚙️ Show Advanced Controls" for exotic world types
3. **Basic Controls**: Use "Show/Hide Advanced Controls" for terrain parameters

### Quick Presets
- Use **world type buttons** in Advanced Controls for instant exotic worlds
- Try **color palette presets** for themed color schemes
- Use **environmental presets** (Frozen, Molten, Toxic, Barren) for quick setups

## 🛠️ Technologies Used

- **Three.js** - 3D graphics rendering and WebGL shaders
- **React** - User interface and state management
- **Vite** - Build tool and development server
- **GLSL** - Custom vertex and fragment shaders for terrain and effects

## 🏗️ Architecture

The project is structured in three main layers:

### Rendering Layer (`src/threejs/`)
- `Planet.js` - Main planet mesh with comprehensive shader uniforms
- `Atmosphere.js` - Atmospheric effects and scattering
- `sceneManager.js` - Scene setup, lighting, and animation
- `shaders/` - Advanced GLSL shaders for terrain and materials

### UI Layer (`src/components/`)
- `PromptInterface.jsx` - Natural language planet generation
- `ColorPalette.jsx` - Comprehensive color control system
- `AdvancedControls.jsx` - Exotic world types and parameters
- `GenerationStatus.jsx` - Visual feedback during generation

### Data Layer (`src/types/`, `src/services/`)
- `planetParameters.js` - Parameter schema and validation
- `exoticWorlds.js` - Specialized world type definitions
- `promptToParameters.js` - Keyword-based natural language processing

## 🔬 Technical Details

### Terrain Generation
- Uses **3D Simplex noise** with domain warping for natural variation
- **Continental shelves** created with low-frequency noise layers
- **Mountain ridges** generated using ridge noise functions
- **Erosion simulation** based on slope calculations
- **Impact craters** with realistic bowl and rim shapes

### Shader System
- **Vertex shader** handles terrain displacement and normal calculation
- **Fragment shader** manages biome distribution and exotic effects
- **Uniform system** allows real-time parameter updates
- **Modular design** with separate terrain function library

### Color System
- **Full RGB control** for all surface materials
- **Real-time updates** via WebGL uniforms
- **Preset management** with themed collections
- **Hex input support** for precise color specification

## 🚧 Future Development

The roadmap includes:
- **PBR material system** for more realistic surface rendering
- **Cloud layer generation** with dynamic weather patterns
- **Level-of-detail system** for performance optimization
- **True LLM integration** for more sophisticated natural language processing
- **Export functionality** for generated planets
- **Animation system** for dynamic planetary evolution

## 📝 Contributing

See [CLAUDE.md](CLAUDE.md) for detailed development guidance including:
- Code architecture and patterns
- Adding new features and world types
- Shader development guidelines
- Performance considerations

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Three.js, React, and advanced shader techniques**
