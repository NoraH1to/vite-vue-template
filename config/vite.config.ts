/**
 * @description 配置入口文件
 */

import { mergeConfig } from 'vite';

import commonConfig from './vite.config.common';
import devConfig from './vite.config.dev';
import prodConfig from './vite.config.prod';

import { MODE_DEV, MODE_PROD } from './constant';

export default ({ mode }) => {
  let targetConfig = {};
  // 注入对应模式的配置
  switch (mode) {
    case MODE_DEV:
      targetConfig = devConfig;
      break;
    case MODE_PROD:
      targetConfig = prodConfig;
      break;
  }
  return mergeConfig(commonConfig, targetConfig);
};
