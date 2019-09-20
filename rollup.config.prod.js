import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify-es'
import filesize from 'rollup-plugin-filesize'

// add postcss plugins
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

const pkg = require('./package.json')

const fistLetterUpper = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}


export default {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss({
      extensions: ['.stylus'],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano(),
      ],
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    uglify(),
    filesize(),
  ],
  output: [
    {
      file: './lib/hello.min.js',
      format: 'umd',
      name: fistLetterUpper(pkg.name),
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
      },
      sourcemap: true,
    }, {
      file: './es/hello.es.js',
      format: 'es',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
      },
      banner: '// welcome to here',
      footer: '// powered by love',
    },
  ],
}
