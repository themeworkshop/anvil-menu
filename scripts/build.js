'use strict';

const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

const entryFile = 'src/anvil-menu.ts';

const configs = [
  {
    name: 'AnvilMenu',
    format: 'umd',
    fileName: 'anvil-menu',
    fileExt: '.js',
    plugins: [
      typescript({
        clean: true,
        target: 'es5',
      }),
      // terser()
    ],
  },
  {
    format: 'es',
    fileName: 'anvil-menu',
    fileExt: '.mjs',
    plugins: [
      typescript({
        clean: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES2015',
          },
        },
      }),
      // terser()
    ],
  },
];

configs.forEach(config =>
  Promise.resolve()
    .then(() =>
      rollup.rollup({
        input: entryFile,
        plugins: config.plugins,
      })
    )
    .then(bundle =>
      bundle.write({
        name: config.name,
        file: `dist/${config.fileName}${config.fileExt}`,
        format: config.format,
        sourcemap: true,
      })
    )
    .catch(err => console.log(err))
);
