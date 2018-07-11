import babel from 'rollup-plugin-babel';

export default {
  input: './src/anvil-menu.js',
  output: {
    name: 'AnvilMenu',
    file: './tmp/anvil-menu.js',
    format: 'umd',
    target: 'es5',
    sourcemap: 'inline'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: {
        presets: [
          [
            'env',
            {
              modules: false
            }
          ]
        ],
        plugins: ['external-helpers']
      }
    })
  ]
};
