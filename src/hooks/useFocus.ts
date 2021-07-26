import { Ref, onMounted, ref, watch, onBeforeUnmount } from 'vue';

export interface useFocusProp {
  node: Ref<any>;
  focused?: boolean;
}
export interface useFocusReturn {
  isFocused: Ref<boolean>;
  toggle: () => boolean;
  focus: () => any;
  blur: () => any;
}

export default ({ node, focused }: useFocusProp): useFocusReturn => {
  const isFocused = ref(!!focused);
  const _focus = () =>
    node.value?.focus ? node.value?.focus() : node.value?.$el?.focus?.();
  const _blur = () =>
    node.value?.blur ? node.value?.blur() : node.value?.$el?.blur?.();
  const toggle = () => (isFocused.value = !isFocused.value);
  const focus = () => (isFocused.value = true);
  const blur = () => (isFocused.value = false);
  onMounted(() => {
    // 默认需要聚焦时手动聚焦，watch 中监听实例可能未初始化
    !!focused && _focus();
    node.value?.$el?.addEventListener?.('focus', focus, true);
    node.value?.$el?.addEventListener?.('blur', blur, true);
  });
  onBeforeUnmount(() => {
    node.value?.$el?.removeEventListener?.('focus', focus, true);
    node.value?.$el?.removeEventListener?.('blur', blur, true);
  });
  watch(isFocused, (v) => {
    v ? _focus() : _blur();
  });
  return {
    isFocused,
    toggle,
    focus,
    blur,
  };
};
