import { ServiceReturn } from '@@/types/api';
import { Ref, ref, UnwrapRef, watch } from 'vue';
import toast from '@/utils/toast';

type UseApiReturn<P, R> = {
  loading: Ref<boolean>;
  reactiveParams: Ref<UnwrapRef<P> | undefined>;
  data: Ref<R | undefined>;
};

export default <P = undefined, R = any>(
  api: (prop: P) => ServiceReturn<R>,
  params: P,
  successMsg?: string,
  errorMsg?: string,
): UseApiReturn<P, R> => {
  let loading = ref(false);
  let reactiveParams = ref(params);
  let data = ref<R | undefined>();
  const { request, cancel } = api(params);
  // loading 改变且为 true 的时候，请求数据
  watch(
    loading,
    (val) =>
      val &&
      request()
        .then((res) => {
          successMsg && toast.success(successMsg);
          data.value = res.data;
        })
        .catch((err) => {
          errorMsg && toast.error(errorMsg);
        })
        .finally(() => (loading.value = false)),
  );
  return { loading, reactiveParams, data };
};
