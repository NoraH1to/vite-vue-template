import { ServiceReturn } from '@@/types/api';
import { Ref, isRef, isReactive, watch, onBeforeUnmount } from 'vue';
import toast from '@/utils/toast';
import useState from './useState';

export type Api<P, R> = (prop?: P) => ServiceReturn<R>;
export type Msg = {
  successMsg?: string;
  errorMsg?: string;
};

export type UseApiProp<P, R> = {
  api: Api<P, R>;
  params?: P | Ref<P>;
  msg: Msg;
};
export type UseApiReturn<P, R> = {
  loading: Ref<boolean>;
  setLoading: (loading: boolean) => void;
  reactiveParams: Ref<P | undefined>;
  data: Ref<R | undefined>;
};

export default <P = undefined, R = undefined>({
  api,
  params,
  msg = {},
}: UseApiProp<P, R>): UseApiReturn<P, R> => {
  const { successMsg, errorMsg } = msg;

  const [loading, setLoading] = useState<boolean>(false);
  let reactiveParams;
  if (isRef(params)) reactiveParams = params;
  else [reactiveParams] = useState<P | undefined>(params);
  const [data, setData] = useState<R | undefined>(undefined);

  const { request, cancel } = api(reactiveParams.value);
  watch(
    loading,
    (val) =>
      val &&
      request()
        .then((res) => {
          successMsg && toast.success(successMsg);
          setData(res.data);
        })
        .catch((err) => {
          errorMsg && toast.error(errorMsg);
        })
        .finally(() => setLoading(false)),
  );

  onBeforeUnmount(() => {
    cancel();
  });

  return { loading, setLoading, reactiveParams, data };
};
