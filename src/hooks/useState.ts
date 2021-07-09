import { Ref, ref } from 'vue';

export type UseStateReturn<T> = [Ref<T>, any];

export default <T>(target: T): UseStateReturn<T> => {
  const value = ref<T>(target) as Ref<T>;
  const setValue = (newVal: any) => {
    value.value = newVal;
  };
  return [value, setValue];
};
