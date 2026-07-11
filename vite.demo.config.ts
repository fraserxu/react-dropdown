import { defineConfig } from 'vite'

export default defineConfig({
  root: 'example',
  base: '/react-dropdown/',
  build: {
    outDir: '../demo-dist',
    emptyOutDir: true,
  },
})
