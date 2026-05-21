import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    name: "skuview-test",
    setupFiles: ['./vitest-setup.js'],
    globals: true,
    css: true,
    exclude: ['node_modules', 'tests/**'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text-summary'],
      exclude: ['**/*.spec.*', '**/*.test.*', '.next/**', 'node_modules/**'],
    },
  },
})