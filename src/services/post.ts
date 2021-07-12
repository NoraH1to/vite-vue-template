import { service } from './service';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';
import { ServiceReturn } from '@@/types/api';

interface POSTProps {
  url: string;
  data?: any;
  json?: boolean;
  config?: AxiosRequestConfig;
}
type POSTReturn<R = any> = ServiceReturn<R>;

export const POST = <R = any>({
  url,
  data,
  json = true,
  config,
}: POSTProps): POSTReturn<R> =>
  service<R>({
    ...config,
    url,
    method: 'POST',
    data: json ? data : qs.stringify(data),
  });
