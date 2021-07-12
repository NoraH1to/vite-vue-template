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
  type RequestType<R> = () => Promise<R>;

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
  interface Service<R = any> {
    (config: ServiceProp): ServiceReturn<R>;
  }
  type ServiceProp = RequestConfig<AxiosRequestConfig>;
  interface ServiceReturn<R = any> {
    request: RequestType<AxiosResponse<R>>;
    cancel: RequestCancelType<CancelTokenSource['cancel']>;
  }
}
