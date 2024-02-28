import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

const commonBundleConfigs = {
  name: 'D-pro',
  format: 'umd',
  sourcemap: true,
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    antd: 'antd',
  },
}

export default {
  input: 'src/index.ts',

  output: [
    {
      ...commonBundleConfigs,
      file: 'dist/index.umd.js',
    },
    {
      ...commonBundleConfigs,
      file: 'dist/index.umd.min.js',
      plugins: [
        terser(),
      ],
    },
  ],

  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs({
      transformMixedEsModules: true,
      include: /node_modules/,
    }),
    typescript(),
    postcss(),
  ],

  external: [
    'react',
    'react-dom',
    'antd',
  ],
}
