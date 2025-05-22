# Planet Generation Development Roadmap

This document outlines the planned phases and steps to enhance the procedural planet generation capabilities.

## Phase 1: Core Visual Realism Enhancements

-   [x] **1. Advanced Terrain with Fractional Brownian Motion (FBM) Parameterization**
    -   [x] Expose FBM parameters (octaves, initial amplitude, lacunarity, persistence, strength) as uniforms in `planetVertex.glsl`.
    -   [x] Add corresponding uniforms and parameter updates in `Planet.js`.
    -   [x] Add state management for new FBM parameters in `App.jsx`.
    -   [x] Add UI controls for new FBM parameters in `Controls.jsx`.

-   [ ] **2. Altitude-Based Biome Coloring Parameterization**
    -   [ ] Identify hardcoded color values and altitude thresholds in `planetFragment.glsl`.
    -   [ ] Define new uniforms in `planetFragment.glsl` for biome colors (e.g., `u_color_deep_water`, `u_color_shallows`, `u_color_low_land`, `u_color_mountains`, `u_color_snow`) and altitude thresholds (e.g., `u_shallows_level`, `u_low_land_level`, `u_mountain_level`, `u_snow_line_level`).
    -   [ ] Update `planetFragment.glsl` to use these uniforms instead of hardcoded values for biome coloring.
    -   [ ] Add corresponding uniforms and parameter updates in `Planet.js`, sourcing values from `this.params`.
    -   [ ] Add state management for new biome color and threshold parameters in `App.jsx`.
    -   [ ] Add UI controls (e.g., color pickers, sliders) for these parameters in `Controls.jsx`.

-   [ ] **3. Atmospheric Scattering (Sky & Haze)**
    -   [ ] Research and choose a suitable atmospheric scattering technique (e.g., skydome shader, post-processing effect).
    -   [ ] Create new GLSL shaders for Rayleigh and Mie scattering.
    -   [ ] Implement the chosen technique, potentially integrating with `sceneManager.js`.
    -   [ ] Expose key atmospheric parameters (e.g., density, scattering coefficients, sun position) as uniforms.
    -   [ ] Add controls for these parameters.

-   [ ] **4. Improved Water Shading**
    -   [ ] Enhance `planetFragment.glsl` for areas below `u_water_level`.
    -   [ ] Implement specular highlights from a light source.
    -   [ ] Add depth-based color variation for water.
    -   [ ] (Optional) Explore basic screen-space reflections or refractions.
    -   [ ] Add relevant uniforms and controls for water properties (e.g., specular color, depth color, opacity).

-   [ ] **5. Texture-Based Biomes & Splat Mapping**
    -   [ ] Source or create a set of PBR-friendly seamless textures for different biomes (e.g., rock, sand, grass, snow, dirt).
    -   [ ] Design a method for generating a splat map (procedurally in shader or pre-calculated) based on terrain data (height, slope, noise).
    -   [ ] Modify `planetFragment.glsl` to sample and blend multiple terrain textures using the splat map.
    -   [ ] Update `Planet.js` for loading and managing these textures as uniforms.
    -   [ ] Add controls for texture scaling, blending sharpness, etc.

-   [ ] **6. Procedural Cloud Layer**
    -   [ ] Design a cloud shader using noise functions (e.g., FBM-style noise for cloud shapes and density).
    -   [ ] Implement the cloud layer on a separate sphere mesh slightly larger than the planet.
    -   [ ] Animate clouds by evolving the noise input over time (using `u_time`).
    -   [ ] Implement basic cloud shadowing on the planet surface (can be a separate calculation or baked into light).
    -   [ ] Add controls for cloud cover, density, altitude, speed, color.
    -   [ ] Integrate into `sceneManager.js`.

-   [ ] **7. Terrain Level of Detail (LOD)**
    -   [ ] Research terrain LOD techniques suitable for a sphere (e.g., Quadtree on sphere faces, Geometrical MipMapping for spherical chunks, ROAM).
    -   [ ] Design and implement a dynamic geometry system to replace the static `IcosahedronGeometry`.
    -   [ ] Vertex generation logic (FBM displacement) will need to be applied to the dynamic LOD system.
    -   [ ] (This is a complex, potentially multi-stage task).

## Phase 2: Introducing Scientific Parameterization

-   [ ] **8. Define & Integrate Core Scientific Inputs**
    -   [ ] Identify a starting set of scientific input parameters (e.g., planet radius, stellar luminosity, orbital distance, base atmospheric density, water prevalence).
    -   [ ] Add state management for these scientific inputs in `App.jsx`.
    -   [ ] Create UI elements in `Controls.jsx` for users to set these scientific inputs.

-   [ ] **9. Develop a "Planet Profile" Translation Module**
    -   [ ] Create a new JavaScript module (e.g., `PlanetProfileGenerator.js`).
    -   [ ] Implement functions within this module that take scientific inputs (from Step 8) and translate them into derived visual parameters used by the Phase 1 renderer (e.g., calculate average surface temperature, estimate ice cap extent, determine base atmospheric tint, adjust biome thresholds).
    -   [ ] Initial logic will be rule-based and use simplified formulas.

-   [ ] **10. Connect Profile to Renderer**
    -   [ ] Modify `App.jsx` or `PlanetCanvas.jsx` to call the `PlanetProfileGenerator` with the scientific inputs.
    -   [ ] Pass the generated visual parameters from the profile to `Planet.js` (via `params` in constructor or update method).
    -   [ ] Ensure the rendering components (shaders, `Planet.js` uniforms) correctly use these derived visual parameters.

## Phase 3: LLM Integration

-   [ ] **11. Design LLM Interaction Protocol**
    -   [ ] Define the specific scientific parameters to be sent to the LLM.
    -   [ ] Design the prompt structure for querying the LLM (e.g., "Describe the likely appearance of a planet with these characteristics...").
    -   [ ] Define the expected format for the LLM's response (e.g., structured JSON with descriptive keywords, color suggestions, feature probabilities).

-   [ ] **12. Implement LLM API Communication**
    -   [ ] Create a new service module in JavaScript to handle API calls to the chosen LLM.
    -   [ ] Implement functions to format the prompt, send the request, and receive/handle the LLM's response (including error handling).

-   [ ] **13. Translate LLM Response to Planet Profile / Renderer Parameters**
    -   [ ] Develop logic to parse the LLM's response.
    -   [ ] Implement a mapping system (e.g., rule-based, keyword extraction, value ranges) to translate the LLM's descriptive output into the concrete parameters required by your `PlanetProfileGenerator` module or directly into the renderer's visual parameters.
    -   [ ] This step will likely involve significant iteration and refinement.

-   [ ] **14. Iterate & Refine**
    -   [ ] Continuously improve visual realism by adding more advanced rendering techniques (e.g., hydraulic/thermal erosion, advanced tectonic concepts).
    -   [ ] Expand the range of scientific parameters.
    -   [ ] Refine LLM prompts and response parsing for better accuracy and control.
    -   [ ] Explore feedback loops (e.g., LLM critiques generated images).
