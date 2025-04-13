import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(Components, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      // Add other aliases as needed
    },
  },
});,
});