/// <reference types="vitest" />
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({ exclude: ['**/*.test.ts', '**/*.spec.ts'] }),
    viteCompression({
      algorithm: 'gzip' // 或者使用 'brotliCompress' 用于更高级的压缩
    })
  ],
  test: {
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: 'tools/index.ts', // 工具库入口
      name: 'zhuba-tools', // 工具库名称
      fileName: (format) => `zhuba-tools.${format}.js` // 工具库名称
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: false
      }
    }
  }
});
