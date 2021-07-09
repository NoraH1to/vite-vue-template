import useApi, { Api, Msg, UseApiReturn } from './useApi';

export default <P = undefined, R = any>(
  api: Api<P, R>,
  params: P,
  msg: Msg = {},
): UseApiReturn<P, R> => {
  const result = useApi(api, params, msg);
  result.setLoading(true);
  return result;
};
