import { ServiceProp, ServiceReturn } from '@@/types/api';
import axios, { AxiosResponse } from 'axios';

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

// 响应拦截
$service.interceptors.response.use(
  (response) => {
    const { status, data, statusText } = response;
    if (status >= 200 && status < 300) return Promise.resolve(response);
    return Promise.reject(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const service = <R = any>(config: ServiceProp): ServiceReturn<R> => {
  // 每个请求都会返回撤销方法
  const cancel = getCancel();
  return {
    request: () =>
      $service.request<any, AxiosResponse<R>>({
        ...config,
        cancelToken: cancel.token,
      }),
    cancel: cancel.cancel,
  };
};

export default $service;
