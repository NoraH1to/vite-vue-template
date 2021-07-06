/**
 * @description 基础共用配置
 */

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import styleImport from 'vite-plugin-style-import';
const path = require('path');

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '../src') },
      { find: '@@', replacement: path.resolve(__dirname, '../') },
    ],
  },
  envDir: path.resolve(__dirname, '../env'),
  root: path.resolve(__dirname, '../'),
});
