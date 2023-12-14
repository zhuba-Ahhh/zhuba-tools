/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  test: {
    environment: "jsdom",
  },
  build: {
    lib: {
      entry: "tools/index.ts", // 工具库入口
      name: "zhuba-tools", // 工具库名称
      fileName: (format) => `zhuba-tools.${format}.js`, // 工具库名称
    },
  },
});
