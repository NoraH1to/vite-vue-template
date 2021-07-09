import { ServiceReturn } from '@@/types/api';
import { Ref, UnwrapRef, watch } from 'vue';
import toast from '@/utils/toast';
import useState from './useState';

type UseApiReturn<P, R> = {
  loading: Ref<boolean>;
  setLoading: (loading: boolean) => void;
  reactiveParams: Ref<UnwrapRef<P> | undefined>;
  data: Ref<UnwrapRef<R> | undefined>;
};

export default <P = undefined, R = any>(
  api: (prop: P) => ServiceReturn<R>,
  params: P,
  msg: {
    successMsg?: string;
    errorMsg?: string;
  } = {},
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
        .finally(() => setLoading(true)),
  );

  return { loading, setLoading, reactiveParams, data };
};
