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
      {/* Add more controls for other parameters */}
      <button onClick={onRegenerate}>Regenerate (New Seed)</button>
    </div>
  );
}

export default Controls;