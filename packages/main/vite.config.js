import { builtinModules } from 'module'
import pkg from '../../package.json'

const config = {
  mode: process.env.MODE,
  root: __dirname,
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    minify: process.env.MODE === 'production',
    emptyOutDir: true,
    outDir: '../../dist/main',
    rollupOptions: {
      external: ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {})]
    }
  }
}

export default config
