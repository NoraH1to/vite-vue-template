import { ref, defineComponent, toRefs, PropType, computed } from 'vue';
import { ElDivider, ElButton, ElInput } from 'element-plus';
import { useApi, useFocus, useHistory, useState } from '@/hooks';
import { example, ExampleParams, ExampleReturn } from '@/services/api/example';
import { Msg } from '@/hooks/useApi';

export default defineComponent({
  components: {
    ElDivider,
    ElButton,
    ElInput,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    params: {
      type: Object as PropType<ExampleParams>,
      required: true,
    },
    propComp: {
      type: Function as PropType<({ msg }: { msg: Msg }) => JSX.Element>,
      required: true,
    },
  },
  name: 'HelloWorld',
  setup: (props, { slots }) => {
    const DefaultSlot = slots.default;
    const { title, params } = toRefs(props);
    const { propComp } = props;
    let [count] = useState(0);
    const CountComponent = defineComponent(() => () => (
      <ElButton onclick={() => count.value++}>count is: {count.value}</ElButton>
    ));

    let {
      loading,
      data,
      error,
      params: reactiveParams,
      msg,
    } = useApi<ExampleParams, ExampleReturn>({
      api: example,
      params: params.value,
      msg: {
        successMsg: '成功',
        errorMsg: '失败',
      },
    });
    const dataStr = computed(
      () =>
        `${data.value?.data.hello || ''} ${data.value?.data.world || ''}` || '',
    );
    const RequestComponent = defineComponent(() => () => (
      <>
        <ElInput
          v-model={msg.value.successMsg}
          style={{ width: '180px' }}
          placeholder="成功提示信息"
        />
        <ElInput
          v-model={msg.value.errorMsg}
          style={{ width: '180px', marginLeft: '10px' }}
          placeholder="错误提示信息"
        />
        <ElButton
          style={{ marginLeft: '10px' }}
          onclick={() => (loading.value = true)}
          loading={loading.value}>
          {`loading: ${loading.value}`}
        </ElButton>
      </>
    ));

    let focusNode = ref();
    const { focus, blur, isFocused } = useFocus({
      node: focusNode,
      focused: true,
    });
    const isFocusedStr = computed(() => isFocused.value.toString?.() || '');
    const FocusComponent = defineComponent(() => () => (
      <>
        <ElInput
          v-model={isFocusedStr.value}
          style={{ width: '180px' }}
          ref={focusNode}
        />
        <ElButton
          style={{ marginLeft: '10px' }}
          onclick={() => focus()}
          type="primary">
          focus
        </ElButton>
        <ElButton style={{ marginLeft: '10px' }} onclick={() => blur()}>
          blur
        </ElButton>
      </>
    ));

    const {
      value: historyValue,
      setValue,
      goBack,
      goForward,
    } = useHistory<string>('1');

    return () => (
      <>
        <h1>{title.value}</h1>

        {slots.default?.({ msg: msg.value })}

        <propComp msg={msg.value} />

        <el-divider>{dataStr.value}</el-divider>

        <CountComponent />

        <el-divider>{dataStr.value}</el-divider>

        <RequestComponent />

        <el-divider>{dataStr.value}</el-divider>

        <FocusComponent />

        <el-divider>{dataStr.value}</el-divider>

        <ElInput style={{ width: '180px' }} v-model={historyValue.value} />
        <ElButton style={{ marginLeft: '10px' }} onClick={goBack}>
          goBack
        </ElButton>
        <ElButton onClick={goForward}>goForward</ElButton>
      </>
    );
  },
});
