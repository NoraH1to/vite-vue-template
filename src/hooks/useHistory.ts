import { Ref, ref, watch } from 'vue';
import useState, { UseStateReturn } from './useState';

export interface UseHistoryReturn<T> {
  value: UseStateReturn<T>[0];
  setValue: UseStateReturn<T>[1];
  goBack: () => void;
  goForward: () => void;
}

export default <T>(target: T): UseHistoryReturn<T> => {
  const [history] = useState<T[]>([target]);
  const [index] = useState<number>(0);
  const [value, setValue] = useState<T>(target);
  const [dontAdd] = useState<boolean>(false);

  /**
   * @description 若下标不在记录尾部，则替换下标后的为新元素
   */
  const updateHistory = (newVal: T) => {
    index.value + 1 == history.value.length
      ? history.value.push(newVal)
      : history.value.splice(
          index.value + 1,
          history.value.length - index.value + 1,
          newVal,
        );
  };

  const addValue = (newVal: T) => {
    updateHistory(newVal);
    index.value++;
  };

  watch(
    value,
    (v) => {
      !dontAdd.value && addValue(v);
      dontAdd.value && (dontAdd.value = false);
    },
    { deep: true },
  );

  const _setValue = (newVal: T) => {
    addValue(newVal);
    setValue(newVal);
  };

  /**
   * @description 记录退步
   */
  const goBack = () => {
    // 记录数 > 1 则后退
    if (index.value > 0) {
      dontAdd.value = true;
      setValue(history.value[--index.value]);
    }
  };

  /**
   * @description 记录进步
   */
  const goForward = () => {
    // 下标 < 长度 - 1 则前进
    if (index.value < history.value.length - 1) {
      dontAdd.value = true;
      setValue(history.value[++index.value]);
    }
  };

  return {
    value,
    setValue: _setValue,
    goBack,
    goForward,
  };
};
