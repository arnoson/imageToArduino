import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  root: 'src',

  build: {
    rollupOptions: {
      input: mode === 'development' ? 'src/index.html' : 'src/index.ts',
    },
  },
}))
