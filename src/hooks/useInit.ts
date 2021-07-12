import useApi, { Api, Msg, UseApiProp, UseApiReturn } from './useApi';

export default <P = undefined, R = any>({
  api,
  params,
  msg = {},
}: UseApiProp<P, R>): UseApiReturn<P, R> => {
  const result = useApi({ api, params, msg });
  result.setLoading(true);
  return result;
};
