import { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

export = ApiInterface;
export as namespace ApiInterface;

declare namespace ApiInterface {
  /**
   * @description 请求配置
   */
  type RequestConfig = AxiosRequestConfig;

  /**
   * @description 请求方法
   */
  type RequestType<R> = (config: RequestConfig) => Promise<R>;

  /**
   * @description 取消请求方法
   */
  type RequestCancelType<R> = R;

  /**
   * @description 响应数据
   */
  type ResponseType = any;

  /**
   * @description 请求服务
   */
  interface Service {
    (config: RequestConfig): ServiceReturn;
  }

  /**
   * @description 请求服务内容
   */
  interface ServiceReturn {
    request: RequestType<AxiosResponse<any>>;
    cancel: RequestCancelType<CancelTokenSource['cancel']>;
  }
}
