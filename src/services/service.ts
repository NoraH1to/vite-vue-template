import { Service } from '@@/types/api';
import axios from 'axios';

const getCancel = () => axios.CancelToken.source();

const $service = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
// 请求拦截
$service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// service.defaults.baseURL = BASE_URL;

// 响应拦截
$service.interceptors.response.use(
  (response) => {
    if (response.status < 200 || response.status >= 300) {
      // toast.error(response.statusText);
      return Promise.reject(response.data);
    }
    if (response.data.code) {
      if (response.data.code >= 200 && response.data.code < 300) {
        // 有 msg 配置的提醒成功
        // response.config.msg && toast.success(response.config.msg);
        return Promise.resolve(response.data);
      } else if (response.data.code == 403) {
        // toast.error(response.data.msg);
      } else {
        // toast.error(response.data.msg);
      }
    }
    return Promise.reject(response.data);
  },
  (error) => {
    // toast.error(error.message);
    return Promise.reject(error);
  },
);

export const service: Service = (config) => {
  const cancel = getCancel();
  return {
    request: () =>
      $service.request({
        ...config,
        cancelToken: cancel.token,
      }),
    cancel: cancel.cancel,
  };
};

export default $service;
