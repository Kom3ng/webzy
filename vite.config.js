import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': "vue/dist/vue.esm-bundler.js"
    }
  },
  base: './', // 这里更改打包相对绝对路径
  minify: true, // 是否压缩代码
})

