/**
 * @description 配置入口文件
 */

import { mergeConfig } from 'vite';

import commonConfig from './vite.config.common';
import devConfig from './vite.config.dev';

import { MODE_DEV } from './constant';

export default ({ mode }) => {
  let targetConfig = {};
  // 注入对应模式的配置
  switch (mode) {
    case MODE_DEV:
      targetConfig = devConfig;
      break;
  }
  return mergeConfig(commonConfig, targetConfig);
};
