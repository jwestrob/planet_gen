import React, { useState } from 'react';
import { PlanetPresets } from '../types/planetParameters';

const examplePrompts = [
  "Ancient desert planet with deep canyons and rust-colored sands",
  "Young volcanic world with toxic atmosphere and lava oceans",
  "Frozen moon with subsurface oceans and geysers",
  "Earth-like planet with vast forests and mountain ranges",
  "Water world with scattered archipelagos and coral reefs",
  "Barren rocky planet scarred by asteroid impacts",
  "Jungle planet with dense vegetation and constant storms",
  "Mars-like world with polar ice caps and red dust storms"
];

function PromptInterface({ onGenerate, isGenerating = false }) {
  const [prompt, setPrompt] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
    setShowExamples(false);
  };

  const handlePresetClick = (preset) => {
    onGenerate(preset.description, preset.params);
  };

  return (
    <div className="prompt-interface">
      <div className="prompt-header">
        <h3>Describe Your Planet</h3>
        <p>Use natural language to generate a unique world</p>
      </div>

      <form onSubmit={handleSubmit} className="prompt-form">
        <div className="prompt-input-wrapper">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your planet... (e.g., 'Ancient desert world with towering red cliffs and underground water')"
            rows="3"
            disabled={isGenerating}
          />
          <div className="prompt-actions">
            <button 
              type="button" 
              onClick={() => setShowExamples(!showExamples)}
              className="examples-button"
            >
              {showExamples ? 'Hide' : 'Show'} Examples
            </button>
            <button 
              type="submit" 
              disabled={!prompt.trim() || isGenerating}
              className="generate-button"
            >
              {isGenerating ? 'Generating...' : 'Generate Planet'}
            </button>
          </div>
        </div>
      </form>

      {showExamples && (
        <div className="examples-section">
          <h4>Example Prompts</h4>
          <div className="example-prompts">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="example-prompt"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="presets-section">
        <h4>Quick Presets</h4>
        <div className="preset-buttons">
          {Object.entries(PlanetPresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePresetClick(preset)}
              className="preset-button"
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PromptInterface;