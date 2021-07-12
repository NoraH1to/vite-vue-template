/**
 * @description 基础共用配置
 */

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport from 'vite-plugin-style-import';
const path = require('path');

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [
    vueJsx(),
    vue(),
    // 自动引入 element 样式
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
    // 为不兼容 esm 的浏览器生成 polyfill chunk, 需要使用的浏览器会异步加载
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  // 路径别名
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '../src') },
      { find: '@@', replacement: path.resolve(__dirname, '../') },
    ],
  },
  // 环境变量文件目录
  envDir: path.resolve(__dirname, '../env'),
  // 项目根路径
  root: path.resolve(__dirname, '../'),
});
