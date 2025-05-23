import React, { useState } from 'react';

const colorParameters = [
  { key: 'waterColor', label: 'Ocean Color', category: 'Water' },
  { key: 'waterDeepColor', label: 'Deep Ocean', category: 'Water' },
  { key: 'sandColor', label: 'Sand/Beach', category: 'Surface' },
  { key: 'rockColor', label: 'Rock/Mountains', category: 'Surface' },
  { key: 'vegetationColor', label: 'Vegetation', category: 'Surface' },
  { key: 'snowColor', label: 'Snow/Ice', category: 'Surface' },
  { key: 'volcanoColor', label: 'Volcanic/Lava', category: 'Special' },
  { key: 'atmosphereTint', label: 'Atmosphere', category: 'Atmosphere' },
];

function ColorPalette({ params, onParamChange, isCollapsed, onToggle }) {
  const [selectedCategory, setSelectedCategory] = useState('Surface');
  
  const categories = ['Water', 'Surface', 'Special', 'Atmosphere'];
  
  const filteredColors = colorParameters.filter(param => 
    param.category === selectedCategory
  );

  const presetPalettes = {
    'Earth-like': {
      waterColor: '#006994',
      waterDeepColor: '#001F3F',
      sandColor: '#C19A6B',
      rockColor: '#8B7355',
      vegetationColor: '#228B22',
      snowColor: '#FFFFFF',
      volcanoColor: '#8B0000',
      atmosphereTint: '#87CEEB'
    },
    'Mars-like': {
      waterColor: '#8B4513',
      waterDeepColor: '#654321',
      sandColor: '#D2691E',
      rockColor: '#A0522D',
      vegetationColor: '#556B2F',
      snowColor: '#F5F5DC',
      volcanoColor: '#800000',
      atmosphereTint: '#DEB887'
    },
    'Alien Desert': {
      waterColor: '#4B0082',
      waterDeepColor: '#2F0052',
      sandColor: '#FFD700',
      rockColor: '#B8860B',
      vegetationColor: '#9ACD32',
      snowColor: '#E6E6FA',
      volcanoColor: '#FF4500',
      atmosphereTint: '#FFA500'
    },
    'Frozen World': {
      waterColor: '#4682B4',
      waterDeepColor: '#191970',
      sandColor: '#F0F8FF',
      rockColor: '#2F4F4F',
      vegetationColor: '#008B8B',
      snowColor: '#FFFAFA',
      volcanoColor: '#FF6347',
      atmosphereTint: '#B0E0E6'
    },
    'Lava World': {
      waterColor: '#FF4500',
      waterDeepColor: '#8B0000',
      sandColor: '#2F2F2F',
      rockColor: '#000000',
      vegetationColor: '#654321',
      snowColor: '#696969',
      volcanoColor: '#FF0000',
      atmosphereTint: '#FF8C00'
    },
    'Tholin World': {
      waterColor: '#8B4513',
      waterDeepColor: '#654321',
      sandColor: '#DEB887',
      rockColor: '#D2691E',
      vegetationColor: '#B8860B',
      snowColor: '#F5DEB3',
      volcanoColor: '#A0522D',
      atmosphereTint: '#F4A460'
    }
  };

  const applyPalette = (paletteName) => {
    const palette = presetPalettes[paletteName];
    Object.entries(palette).forEach(([key, value]) => {
      onParamChange(key, value);
    });
  };

  if (isCollapsed) {
    return (
      <div className="color-palette collapsed">
        <button onClick={onToggle} className="palette-toggle">
          🎨 Show Color Palette
        </button>
      </div>
    );
  }

  return (
    <div className="color-palette">
      <div className="palette-header">
        <h4>🎨 Color Palette</h4>
        <button onClick={onToggle} className="palette-toggle">
          Hide
        </button>
      </div>

      <div className="palette-presets">
        <label>Quick Palettes:</label>
        <div className="preset-grid">
          {Object.keys(presetPalettes).map(paletteName => (
            <button
              key={paletteName}
              onClick={() => applyPalette(paletteName)}
              className="palette-preset"
              title={`Apply ${paletteName} color scheme`}
            >
              {paletteName}
            </button>
          ))}
        </div>
      </div>

      <div className="color-categories">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="color-controls">
        {filteredColors.map(({ key, label }) => (
          <div key={key} className="color-control">
            <label>{label}</label>
            <div className="color-input-group">
              <input
                type="color"
                value={params[key] || '#ffffff'}
                onChange={(e) => onParamChange(key, e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={params[key] || '#ffffff'}
                onChange={(e) => onParamChange(key, e.target.value)}
                className="color-hex"
                pattern="^#[0-9A-Fa-f]{6}$"
                placeholder="#ffffff"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="random-palette">
        <button
          onClick={() => {
            const randomPalette = Object.keys(presetPalettes)[
              Math.floor(Math.random() * Object.keys(presetPalettes).length)
            ];
            applyPalette(randomPalette);
          }}
          className="random-button"
        >
          🎲 Random Palette
        </button>
      </div>
    </div>
  );
}

export default ColorPalette;