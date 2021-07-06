/**
 * @description 基础共用配置
 */

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
const path = require('path');

export default defineConfig({
  plugins: [
    vue(),
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
