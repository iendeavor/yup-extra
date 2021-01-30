import ts from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import multiInput from 'rollup-plugin-multi-input'
import replace from '@rollup/plugin-replace'
import rimraf from 'rimraf'

rimraf.sync('lib')

export default {
  input: ['src/*/*/index.ts'],
  plugins: [
    multiInput(),
    ts(),
    commonjs(),
    replace({
      preventAssignment: true,
      'yup/es/util/isAbsent': 'yup/lib/util/isAbsent',
      'yup/es/util/printValue': 'yup/lib/util/printValue',
    }),
  ],
  external: ['yup', 'yup/lib/util/isAbsent', 'yup/lib/util/printValue'],
  output: {
    dir: 'lib',
    format: 'cjs',
  },
}
