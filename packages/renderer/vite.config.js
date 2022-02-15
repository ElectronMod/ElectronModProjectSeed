import vue from '@vitejs/plugin-vue'

const config = {
  mode: process.env.MODE,
  root: __dirname,
  plugins: [vue()],
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer'
  }
}

export default config
