import { service } from './service';
import qs from 'qs';
import { POSTProps, POSTReturn } from '@@/types/api';

export const POST = <P, R>({
  url,
  data,
  json = true,
  config,
}: POSTProps<P>): POSTReturn<R> =>
  service<R>({
    ...config,
    url,
    method: 'POST',
    data: json ? data : qs.stringify(data),
  });
