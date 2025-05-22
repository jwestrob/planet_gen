// src/components/Controls.jsx
import React from 'react';

function Controls({ params, onParamChange, onRegenerate }) {
  return (
    <div className="controls-panel">
      <div>
        <label htmlFor="noiseScale">Noise Scale: {params.noiseScale.toFixed(2)}</label>
        <input
          type="range"
          id="noiseScale"
          min="0.1"
          max="20"
          step="0.1"
          value={params.noiseScale}
          onChange={(e) => onParamChange('noiseScale', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="waterLevel">Water Level: {params.waterLevel.toFixed(2)}</label>
        <input
          type="range"
          id="waterLevel"
          min="0.0"
          max="1.0"
          step="0.01"
          value={params.waterLevel}
          onChange={(e) => onParamChange('waterLevel', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fbmOctaves">FBM Octaves: {params.fbmOctaves}</label>
        <input
          type="range"
          id="fbmOctaves"
          min="1"
          max="10"
          step="1"
          value={params.fbmOctaves}
          onChange={(e) => onParamChange('fbmOctaves', parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="fbmInitialAmplitude">FBM Initial Amplitude: {params.fbmInitialAmplitude?.toFixed(2)}</label>
        <input
          type="range"
          id="fbmInitialAmplitude"
          min="0.1"
          max="2.0"
          step="0.05"
          value={params.fbmInitialAmplitude}
          onChange={(e) => onParamChange('fbmInitialAmplitude', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fbmLacunarity">FBM Lacunarity: {params.fbmLacunarity?.toFixed(2)}</label>
        <input
          type="range"
          id="fbmLacunarity"
          min="1.5"
          max="4.0"
          step="0.1"
          value={params.fbmLacunarity}
          onChange={(e) => onParamChange('fbmLacunarity', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fbmPersistence">FBM Persistence: {params.fbmPersistence?.toFixed(2)}</label>
        <input
          type="range"
          id="fbmPersistence"
          min="0.1"
          max="0.9"
          step="0.05"
          value={params.fbmPersistence}
          onChange={(e) => onParamChange('fbmPersistence', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fbmStrength">FBM Strength: {params.fbmStrength?.toFixed(2)}</label>
        <input
          type="range"
          id="fbmStrength"
          min="0.05"
          max="1.0"
          step="0.01"
          value={params.fbmStrength}
          onChange={(e) => onParamChange('fbmStrength', e.target.value)}
        />
      </div>
      {/* Add more controls for other parameters */}
      <button onClick={onRegenerate}>Regenerate (New Seed)</button>
    </div>
  );
}

export default Controls;
