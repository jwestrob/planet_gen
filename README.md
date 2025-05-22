# Procedural Planet Generator

## Overview

This project is an interactive procedural planet generator built with Three.js for 3D rendering and React for the user interface. It aims to create visually interesting and eventually scientifically-plausible planetary surfaces based on a variety of configurable parameters.

The generator currently features:
-   A 3D view of a generated planet.
-   Real-time parameter controls to adjust the planet's appearance.
-   Terrain generation using Fractional Brownian Motion (FBM) based on Simplex noise, allowing for detailed and varied landscapes.
-   Configurable FBM parameters including octaves, initial amplitude, lacunarity, persistence, and overall strength.
-   Altitude-based biome coloring, providing distinct visual cues for water bodies, lowlands, highlands, and snow-capped peaks.

## Project Vision

The long-term vision for this project is to evolve it into a sophisticated tool capable of generating highly realistic and scientifically-informed planetary visuals. This includes:
-   Advanced terrain features (erosion, tectonic-like structures, impact craters).
-   Complex texturing and atmospheric effects (PBR materials, atmospheric scattering, dynamic clouds).
-   Parameterization based on scientific inputs (e.g., chemical balances, size, solar flux, magnetism).
-   Potential integration with specialized Large Language Models (LLMs) to provide expert opinion on planetary appearance based on scientific data.

For a detailed plan, see the [PLANET_GENERATION_ROADMAP.md](PLANET_GENERATION_ROADMAP.md) file.

## Current Status

The project is actively under development. Key implemented features include:
-   Core Three.js scene setup for rendering the planet.
-   React components for user interface and parameter controls.
-   Shader-based terrain displacement using FBM.
-   Dynamic parameter updates affecting planet geometry and appearance in real-time.
-   Basic altitude-based coloring in the fragment shader.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```
    git clone (repository-url)
    cd (repository-name)
    ```

2.  **Install dependencies:**
    ```
    npm install
    ```

3.  **Start the development server:**
    ```
    npm run dev
    ```

4.  Open your browser and navigate to the local address provided by Vite (usually http://localhost:5173 or similar).

## Technologies Used

-   **Three.js:** For 3D graphics rendering.
-   **React:** For building the user interface and managing application state.
-   **Vite:** As the build tool and development server.
-   **GLSL:** For writing custom shaders for terrain generation and appearance.

## How to Contribute (Optional - if you plan to open it up)

Details on how to contribute will be added here in the future. For now, feel free to explore the code and experiment with the parameters.

## Future Development

Please refer to the [PLANET_GENERATION_ROADMAP.md](PLANET_GENERATION_ROADMAP.md) for a detailed list of planned features and enhancements. The immediate next steps include:
-   Parameterizing the altitude-based biome coloring.
-   Implementing basic atmospheric scattering.
-   Improving water shading.

---
