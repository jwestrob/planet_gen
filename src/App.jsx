// src/App.jsx
import React, { useState, useCallback } from 'react';
import PlanetCanvas from './components/PlanetCanvas';
import Controls from './components/Controls';
import './App.css'; // Basic styling

function App() {
  const [planetParams, setPlanetParams] = useState({
    seed: Math.random() * 1000,
    noiseScale: 2.00, // Updated
    waterLevel: 0.48, // Updated
    // FBM parameters
    fbmOctaves: 6, // Updated
    fbmInitialAmplitude: -0.50, // Updated
    fbmLacunarity: 2.70, // Updated
    fbmPersistence: 0.70, // Updated
    fbmStrength: 0.08, // Updated
    // Add more parameters here: colors, atmosphere, etc.
  });

  const handleParamChange = useCallback((paramName, value) => {
    setPlanetParams(prevParams => ({
      ...prevParams,
      [paramName]: parseFloat(value) // Ensure value is a number
    }));
  }, []);

  const regeneratePlanet = useCallback(() => {
    setPlanetParams(prevParams => ({
      ...prevParams,
      seed: Math.random() * 1000
    }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Procedural Planet Generator</h1>
      </header>
      <main>
        <Controls
          params={planetParams}
          onParamChange={handleParamChange}
          onRegenerate={regeneratePlanet}
        />
        <PlanetCanvas params={planetParams} />
      </main>
    </div>
  );
}

export default App;
