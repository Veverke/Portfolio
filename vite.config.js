import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Project page deployed at veverke.github.io/Portfolio (repo name is capital P)
  base: '/Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv:   resolve(__dirname, 'cv.html'),
      },
    },
  },
})
