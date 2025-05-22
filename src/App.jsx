// src/App.jsx
import React, { useState, useCallback } from 'react';
import PlanetCanvas from './components/PlanetCanvas';
import Controls from './components/Controls';
import './App.css'; // Basic styling

function App() {
  const [planetParams, setPlanetParams] = useState({
    seed: Math.random() * 1000,
    noiseScale: 5.0,
    waterLevel: 0.2,
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