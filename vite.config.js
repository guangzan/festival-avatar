import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default ({ mode }) => {
  const __DEV__ = mode === 'development'

  return defineConfig({
    base: __DEV__ ? '/' : '/festival-avatar/',
    build: {
      outDir: 'docs',
    },
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: name => `vant/es/${name}/style`,
          },
        ],
      }),
      vueJsx(),
    ],
  })
}
