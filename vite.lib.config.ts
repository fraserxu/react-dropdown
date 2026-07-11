import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: 'src/index.tsx',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
})
