import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * @description 请求成功后会toast该值
     */
    msg?: string;

    /**
     * @description 请求失败后会toast该值，不传会根据后端响应显示
     */
    errMsg?: string;

    /**
     * @description 禁止失败消息
     */
    dontError?: boolean;
  }
}
