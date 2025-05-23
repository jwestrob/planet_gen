import React, { useState } from 'react';
import { ExoticWorldTypes, getExoticWorldParams } from '../types/exoticWorlds';

function AdvancedControls({ params, onParamChange, onApplyWorldType, isCollapsed, onToggle }) {
  const [selectedCategory, setSelectedCategory] = useState('Temperature');

  const controlCategories = {
    'Temperature': [
      { key: 'temperatureRange', label: 'Temperature (°C)', min: -200, max: 1000, step: 5, default: 15 },
      { key: 'iceCapExtent', label: 'Ice Cap Extent', min: 0, max: 1, step: 0.01, default: 0.1 },
    ],
    'Atmosphere': [
      { key: 'atmosphereDensity', label: 'Atmosphere Density', min: 0, max: 2, step: 0.01, default: 0.5 },
      { key: 'cloudCoverage', label: 'Cloud Coverage', min: 0, max: 1, step: 0.01, default: 0.3 },
    ],
    'Surface': [
      { key: 'vegetationCoverage', label: 'Vegetation Coverage', min: 0, max: 1, step: 0.01, default: 0.4 },
      { key: 'desertification', label: 'Desert Coverage', min: 0, max: 1, step: 0.01, default: 0.2 },
      { key: 'surfaceRoughness', label: 'Surface Roughness', min: 0, max: 1, step: 0.01, default: 0.5 },
    ],
    'Geology': [
      { key: 'tectonicActivity', label: 'Tectonic Activity', min: 0, max: 1, step: 0.01, default: 0.3 },
      { key: 'erosionFactor', label: 'Erosion Factor', min: 0, max: 1, step: 0.01, default: 0.0 },
      { key: 'craterDensity', label: 'Crater Density', min: 0, max: 1, step: 0.01, default: 0.0 },
    ],
    'Exotic': [
      { key: 'surfaceEmission', label: 'Surface Glow', min: 0, max: 1, step: 0.01, default: 0.0 },
      { key: 'lavaFlows', label: 'Lava Activity', min: 0, max: 1, step: 0.01, default: 0.0 },
      { key: 'organicHaze', label: 'Organic Haze', min: 0, max: 1, step: 0.01, default: 0.0 },
      { key: 'crystallineFormations', label: 'Crystal Formations', min: 0, max: 1, step: 0.01, default: 0.0 },
      { key: 'acidRain', label: 'Acid Rain', min: 0, max: 1, step: 0.01, default: 0.0 },
    ]
  };

  if (isCollapsed) {
    return (
      <div className="advanced-controls collapsed">
        <button onClick={onToggle} className="controls-toggle">
          ⚙️ Show Advanced Controls
        </button>
      </div>
    );
  }

  return (
    <div className="advanced-controls">
      <div className="controls-header">
        <h4>⚙️ Advanced Controls</h4>
        <button onClick={onToggle} className="controls-toggle">
          Hide
        </button>
      </div>

      <div className="world-types">
        <h5>Exotic World Types</h5>
        <div className="world-type-grid">
          {Object.entries(ExoticWorldTypes).map(([key, worldType]) => (
            <button
              key={key}
              onClick={() => {
                const worldParams = getExoticWorldParams(key);
                onApplyWorldType(worldParams);
              }}
              className="world-type-button"
              title={worldType.description}
            >
              <span className="world-icon">{worldType.icon}</span>
              <span className="world-name">{worldType.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="control-categories">
        {Object.keys(controlCategories).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="parameter-controls">
        {controlCategories[selectedCategory]?.map(control => (
          <div key={control.key} className="parameter-control">
            <label>
              {control.label}: {
                typeof params[control.key] !== 'undefined' 
                  ? (control.key === 'temperatureRange' ? `${params[control.key]}°C` : params[control.key].toFixed(2))
                  : control.default
              }
            </label>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={params[control.key] ?? control.default}
              onChange={(e) => onParamChange(control.key, parseFloat(e.target.value))}
              className="parameter-slider"
            />
            <div className="slider-labels">
              <span>{control.min}</span>
              <span>{control.max}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <button
          onClick={() => {
            // Randomize current category parameters
            const categoryControls = controlCategories[selectedCategory];
            categoryControls.forEach(control => {
              const randomValue = control.min + Math.random() * (control.max - control.min);
              onParamChange(control.key, randomValue);
            });
          }}
          className="randomize-button"
        >
          🎲 Randomize {selectedCategory}
        </button>
        
        <button
          onClick={() => {
            // Reset current category to defaults
            const categoryControls = controlCategories[selectedCategory];
            categoryControls.forEach(control => {
              onParamChange(control.key, control.default);
            });
          }}
          className="reset-button"
        >
          🔄 Reset {selectedCategory}
        </button>
      </div>

      <div className="environmental-presets">
        <h5>Environmental Conditions</h5>
        <div className="preset-buttons">
          <button
            onClick={() => {
              onParamChange('temperatureRange', -100);
              onParamChange('atmosphereDensity', 0.1);
              onParamChange('cloudCoverage', 0.0);
              onParamChange('iceCapExtent', 1.0);
            }}
            className="env-preset"
          >
            ❄️ Frozen
          </button>
          <button
            onClick={() => {
              onParamChange('temperatureRange', 500);
              onParamChange('atmosphereDensity', 0.3);
              onParamChange('tectonicActivity', 1.0);
              onParamChange('surfaceEmission', 0.8);
            }}
            className="env-preset"
          >
            🔥 Molten
          </button>
          <button
            onClick={() => {
              onParamChange('atmosphereDensity', 1.5);
              onParamChange('cloudCoverage', 0.9);
              onParamChange('acidRain', 0.8);
              onParamChange('organicHaze', 0.6);
            }}
            className="env-preset"
          >
            ☠️ Toxic
          </button>
          <button
            onClick={() => {
              onParamChange('waterLevel', 0.0);
              onParamChange('desertification', 1.0);
              onParamChange('erosionFactor', 0.9);
              onParamChange('craterDensity', 0.7);
            }}
            className="env-preset"
          >
            🏜️ Barren
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedControls;