import { Service } from '@@/types/api';
import axios from 'axios';
import toast from '@/utils/toast';

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
    toast.error(error.message || error);
    return Promise.reject(error);
  },
);

// 响应拦截
$service.interceptors.response.use(
  (response) => {
    const {
      status,
      data,
      statusText,
      config: { msg, errMsg, dontError },
    } = response;
    if (status >= 200 && status < 300) {
      msg && toast.success(msg);
      return Promise.resolve(data);
    }
    !dontError && toast.error(errMsg || statusText);
    return Promise.reject(response);
  },
  (error) => {
    toast.error(error.message || error);
    return Promise.reject(error);
  },
);

export const service: Service = (config) => {
  // 每个请求都会返回撤销方法
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
