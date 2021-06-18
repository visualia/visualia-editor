import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { vue: "vue/dist/vue.esm-bundler.js" } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          htmlWorker: [`monaco-editor/esm/vs/language/html/html.worker`],
          editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`],
        },
      },
    },
  },
});
