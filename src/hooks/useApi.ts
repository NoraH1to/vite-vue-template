import { ServiceReturn } from '@@/types/api';
import { Ref, watch, onBeforeUnmount } from 'vue';
import toast from '@/utils/toast';
import useState from './useState';

export interface Api<P, R> {
  (prop: P): ServiceReturn<R>;
}
export type Msg = {
  successMsg?: string;
  errorMsg?: string;
};

export type UseApiProp<P, R> = {
  api: Api<P, R>;
  params: P;
  msg: Msg;
};
export type UseApiReturn<P, R> = {
  loading: Ref<boolean>;
  setLoading: (loading: boolean) => void;
  params: Ref<P>;
  setParams: (params: P) => void;
  data: Ref<R | undefined>;
  msg: Ref<Msg>;
  setMsg: (msg: Msg) => void;
};

export default <P = undefined, R = undefined>({
  api,
  params,
  msg = {},
}: UseApiProp<P, R>): UseApiReturn<P, R> => {
  const [reactiveMsg, setReactiveMsg] = useState(msg);
  const [loading, setLoading] = useState<boolean>(false);
  const [reactiveParams, setReactiveParams] = useState<P>(params);
  const [data, setData] = useState<R | undefined>(undefined);

  const { request, cancel } = api(reactiveParams.value);
  watch(
    loading,
    (val) =>
      val &&
      request()
        .then((res) => {
          reactiveMsg.value.successMsg &&
            toast.success(reactiveMsg.value.successMsg);
          setData(res.data);
        })
        .catch((err) => {
          reactiveMsg.value.errorMsg && toast.error(reactiveMsg.value.errorMsg);
        })
        .finally(() => setLoading(false)),
  );

  onBeforeUnmount(() => {
    cancel();
  });

  return {
    loading,
    setLoading,
    params: reactiveParams,
    setParams: setReactiveParams,
    data,
    msg: reactiveMsg,
    setMsg: setReactiveMsg,
  };
};
