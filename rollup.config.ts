import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import path from 'path';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { fileURLToPath } from 'url';

const pkg = JSON.parse(readFileSync('./package.json').toString('utf-8'));
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const plugins = [
  alias({
    entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }),
  nodeResolve({ extensions: ['.ts'] }),
  esbuild({ include: /\.[jt]sx?$/ }),
];

export default defineConfig([
  {
    input: `src/index.ts`,
    plugins,
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.browser, format: 'umd', sourcemap: true, name: 'lexorank' },
    ],
    external: [],
  },
  {
    input: `src/index.ts`,
    plugins: [plugins[0], plugins[1], dts()],
    output: [{ file: pkg.types, format: 'es' }],
    external: [],
  },
]);
