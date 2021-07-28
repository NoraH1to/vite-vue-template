import { ServiceReturn } from '@@/types/api';
import { Ref, watch, onBeforeUnmount } from 'vue';
import toast from '@/utils/toast';
import { andCatch, andFinally } from '@/utils/ramda';
import useState from './useState';
import { andThen, prop, compose } from 'ramda';

export interface Api<P, R> {
  (prop: P): ServiceReturn<R>;
}
export type Msg = {
  successMsg?: string;
  errorMsg?: string;
};

export type DataType<R> = R | undefined;
export type ErrorType<R> = ReturnType<ServiceReturn<R>['request']> | undefined;
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
  data: Ref<DataType<R>>;
  error: Ref<ErrorType<R>>;
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
  const [data, setData] = useState<DataType<R>>(undefined);
  const [error, setError] = useState<ErrorType<R>>(undefined);

  const { request, cancel } = api(reactiveParams.value);

  const getData = prop('data');
  const setUnLoading = () => setLoading(false);
  const toastSuccessMsg = () => toast.success(reactiveMsg.value.successMsg);
  const toastErrorMsg = () => toast.error(reactiveMsg.value.errorMsg);

  watch(loading, (val) => {
    if (val) {
      const requestSteps: [any, any, any, any] = [
        andFinally(setUnLoading),
        andCatch(compose(toastErrorMsg, setError)),
        andThen(compose(toastSuccessMsg, setData, getData)),
        request,
      ];
      const _request: any = compose(...requestSteps);
      _request();
    }
  });

  onBeforeUnmount(() => {
    cancel();
  });

  return {
    loading,
    setLoading,
    params: reactiveParams,
    setParams: setReactiveParams,
    data,
    error,
    msg: reactiveMsg,
    setMsg: setReactiveMsg,
  };
};
