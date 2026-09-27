import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Pages serves from /teum-muscle/, while Vercel serves from /.
  base: mode === 'github' ? '/teum-muscle/' : '/',
}));
