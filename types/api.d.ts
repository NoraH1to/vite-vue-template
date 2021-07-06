import { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

export = ApiInterface;
export as namespace ApiInterface;

declare namespace ApiInterface {
  /**
   * @description 请求配置
   */
  type RequestConfig<R> = R;

  /**
   * @description 请求方法
   */
  type RequestType<C, R> = (config: RequestConfig<C>) => Promise<R>;

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
    (config: RequestConfig<AxiosRequestConfig>): ServiceReturn;
  }

  /**
   * @description 请求服务内容
   */
  interface ServiceReturn {
    request: RequestType<AxiosRequestConfig, AxiosResponse<any>>;
    cancel: RequestCancelType<CancelTokenSource['cancel']>;
  }
}
