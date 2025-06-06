// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl' // Import

export default defineConfig({
  plugins: [react(), glsl()], // Add glsl()
})