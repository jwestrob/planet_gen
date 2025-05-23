import React from 'react';

function GenerationStatus({ prompt, isGenerating }) {
  if (!isGenerating && !prompt) return null;
  
  return (
    <div className={`generation-status ${isGenerating ? 'active' : 'complete'}`}>
      <div className="status-content">
        {isGenerating ? (
          <>
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p>Analyzing prompt and generating planet parameters...</p>
            <p className="prompt-display">"{prompt}"</p>
          </>
        ) : (
          <>
            <div className="success-icon">✨</div>
            <p>Planet generated successfully!</p>
          </>
        )}
      </div>
    </div>
  );
}

export default GenerationStatus;