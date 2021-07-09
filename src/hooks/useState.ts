import { Ref, ref, UnwrapRef } from 'vue';

export type UseStateReturn<T> = [Ref<UnwrapRef<T>>, any];

export default <T>(target: T): UseStateReturn<T> => {
  const value = ref<T>(target);
  const setValue = (newVal: any) => {
    value.value = newVal;
  };
  return [value, setValue];
};
