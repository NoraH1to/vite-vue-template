import { service } from './service';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';
import { ServiceReturn } from '@@/types/api';

interface POST {
  (prop: {
    url: string;
    data: any;
    json: boolean;
    config: AxiosRequestConfig;
  }): ServiceReturn;
}

export const POST: POST = ({ url, data, json, config }) =>
  service({
    ...config,
    url,
    method: 'POST',
    data: json ? qs.stringify(data) : data,
  });
