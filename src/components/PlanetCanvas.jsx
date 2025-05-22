// src/components/PlanetCanvas.jsx
import React, { useRef, useEffect, memo } from 'react';
import { initScene, animate, updatePlanetAppearance } from '../threejs/sceneManager';

// Memoize to prevent re-renders if params haven't deeply changed for the planet itself
const PlanetCanvas = memo(function PlanetCanvas({ params }) {
  const mountRef = useRef(null);
  const sceneContainerRef = useRef(null); // To store scene essentials

  useEffect(() => {
    // Initialize scene on mount
    if (mountRef.current && !sceneContainerRef.current) {
      sceneContainerRef.current = initScene(mountRef.current, params);
      animate(sceneContainerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (sceneContainerRef.current && mountRef.current) {
        const { renderer } = sceneContainerRef.current;
        if (renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        // Any other cleanup (remove event listeners, cancel animation frame)
        sceneContainerRef.current = null;
      }
    };
  }, []); // Empty dependency array for mount/unmount only

  useEffect(() => {
    // Update planet when parameters change
    if (sceneContainerRef.current) {
      updatePlanetAppearance(sceneContainerRef.current.planet, params);
    }
  }, [params]); // This effect runs when params change

  return <div ref={mountRef} style={{ width: '80vw', height: '70vh', margin: 'auto', border: '1px solid #ccc' }} />;
});

export default PlanetCanvas;
