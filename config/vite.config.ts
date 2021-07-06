/**
 * @description 配置入口文件
 */

import { mergeConfig } from 'vite';

import commonConfig from './vite.config.common';
import devConfig from './vite.config.dev';

export default ({ mode }) => {
  let targetConfig = {};
  // 注入对应模式的配置
  switch (mode) {
    case 'dev':
      targetConfig = devConfig;
      break;
  }
  return mergeConfig(commonConfig, targetConfig);
};
