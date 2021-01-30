import ts from 'rollup-plugin-typescript2'
import multiInput from 'rollup-plugin-multi-input'
import rimraf from 'rimraf'

rimraf.sync('es')

export default {
  input: ['src/*/*/index.ts'],
  plugins: [multiInput(), ts()],
  external: ['yup', 'yup/es/util/isAbsent', 'yup/es/util/printValue'],
  output: {
    dir: 'es',
    format: 'es',
  },
}
