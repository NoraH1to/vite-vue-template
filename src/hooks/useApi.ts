import { ServiceReturn } from '@@/types/api';
import { Ref, UnwrapRef, watch, onBeforeUnmount } from 'vue';
import toast from '@/utils/toast';
import useState from './useState';

export type UseApiReturn<P, R> = {
  loading: Ref<boolean>;
  setLoading: (loading: boolean) => void;
  reactiveParams: Ref<P | undefined>;
  data: Ref<R | undefined>;
};
export type Api<P, R> = (prop: P) => ServiceReturn<R>;
export type Msg = {
  successMsg?: string;
  errorMsg?: string;
};

export default <P = undefined, R = any>(
  api: Api<P, R>,
  params: P,
  msg: Msg = {},
): UseApiReturn<P, R> => {
  const { successMsg, errorMsg } = msg;

  const [loading, setLoading] = useState<boolean>(false);
  const [reactiveParams] = useState<P>(params);
  const [data, setData] = useState<R | undefined>(undefined);

  const { request, cancel } = api(params);
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
