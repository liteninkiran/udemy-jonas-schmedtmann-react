import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: {
            '@ui': path.resolve(__dirname, 'src/ui'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
