// src/App.jsx
import React, { useState, useCallback } from 'react';
import PlanetCanvas from './components/PlanetCanvas';
import Controls from './components/Controls';
import PromptInterface from './components/PromptInterface';
import GenerationStatus from './components/GenerationStatus';
import ColorPalette from './components/ColorPalette';
import AdvancedControls from './components/AdvancedControls';
import { generatePlanetFromPrompt, validateParameters } from './services/promptToParameters';
import { getDefaultParameters } from './types/planetParameters';
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
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState(true);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showExoticControls, setShowExoticControls] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

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
  
  const handlePromptGenerate = useCallback(async (prompt, presetParams = null) => {
    setIsGenerating(true);
    setCurrentPrompt(prompt);
    
    try {
      let newParams;
      
      if (presetParams) {
        // Use preset parameters directly
        newParams = {
          ...getDefaultParameters(),
          ...presetParams,
          seed: Math.random() * 1000
        };
      } else {
        // Generate from prompt
        newParams = await generatePlanetFromPrompt(prompt);
      }
      
      // Merge with current params to preserve any unmapped values
      const mergedParams = {
        ...planetParams,
        ...validateParameters(newParams)
      };
      
      setPlanetParams(mergedParams);
      
      // Show success briefly
      setTimeout(() => {
        setCurrentPrompt('');
      }, 2000);
    } catch (error) {
      console.error('Error generating planet:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [planetParams]);
  
  const handleApplyWorldType = useCallback((worldParams) => {
    const mergedParams = {
      ...planetParams,
      ...validateParameters(worldParams)
    };
    setPlanetParams(mergedParams);
  }, [planetParams]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Procedural Planet Generator</h1>
      </header>
      <main>
        <div className="interface-container">
          <PromptInterface 
            onGenerate={handlePromptGenerate}
            isGenerating={isGenerating}
          />
          
          <div className="controls-section">
            <button 
              className="toggle-controls"
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
            >
              {showAdvancedControls ? 'Hide' : 'Show'} Advanced Controls
            </button>
            
            {showAdvancedControls && (
              <Controls
                params={planetParams}
                onParamChange={handleParamChange}
                onRegenerate={regeneratePlanet}
              />
            )}
          </div>
          
          <ColorPalette
            params={planetParams}
            onParamChange={handleParamChange}
            isCollapsed={!showColorPalette}
            onToggle={() => setShowColorPalette(!showColorPalette)}
          />
          
          <AdvancedControls
            params={planetParams}
            onParamChange={handleParamChange}
            onApplyWorldType={handleApplyWorldType}
            isCollapsed={!showExoticControls}
            onToggle={() => setShowExoticControls(!showExoticControls)}
          />
        </div>
        
        <PlanetCanvas params={planetParams} />
        
        <GenerationStatus 
          prompt={currentPrompt} 
          isGenerating={isGenerating} 
        />
      </main>
    </div>
  );
}

export default App;
