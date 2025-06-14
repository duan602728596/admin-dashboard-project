import { join } from 'node:path';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { checker as viteTsChecker } from 'vite-plugin-checker';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';
import { metaHelper } from '@sweet-milktea/utils';

const { __dirname }: { __dirname: string } = metaHelper(import.meta.url);
const root: string = join(__dirname, 'src');

export default defineConfig({
  root,
  base: '',
  css: {
    preprocessorOptions: {
      sass: {}
    },
    modules: {
      generateScopedName: '[path][name]__[local]___[hash:base64:6]'
    }
  },
  build: {
    outDir: join(__dirname, 'dist'),
    assetsDir: ''
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.mjs',
      '.cjs',
      '.mts',
      '.cts',
      '.jsx'
    ]
  },
  plugins: [
    viteReact({
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['babel-plugin-react-compiler']
      },
      exclude: ['node_modules']
    }),
    viteTsChecker({
      typescript: {
        root,
        tsconfigPath: 'tsconfig.json'
      },
      vls: false
    }),
    mockDevServerPlugin()
  ],
  server: {
    port: 5700,
    proxy: {
      '^/api': { target: 'http://example.com' }
    }
  }
});