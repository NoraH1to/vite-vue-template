import { ref, defineComponent, toRefs, PropType, computed } from 'vue';
import { ElDivider, ElButton, ElInput } from 'element-plus';
import { useApi, useFocus } from '@/hooks';
import { example, ExampleParams, ExampleReturn } from '@/services/api/example';

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
  },
  name: 'HelloWorld',
  setup: (props) => {
    const { title, params } = toRefs(props);

    let count = ref(0);
    const CountComponent = (
      <el-button onclick={() => count.value++}>
        count is: {count.value}
      </el-button>
    );

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
    const RequestComponent = (
      <>
        <el-input
          v-model={msg.value.successMsg}
          style={{ width: '180px' }}
          placeholder="成功提示信息"
        />
        <el-input
          v-model={msg.value.errorMsg}
          style={{ width: '180px', marginLeft: '10px' }}
          placeholder="错误提示信息"
        />
        <el-button
          style={{ marginLeft: '10px' }}
          onclick={() => (loading.value = true)}
          loading={loading.value}>
          {`loading: ${loading.value}`}
        </el-button>
      </>
    );

    let focusNode = ref();
    const { focus, blur, isFocused } = useFocus({
      node: focusNode,
      focused: true,
    });
    const isFocusedStr = computed(() => isFocused.value.toString?.() || '');
    const FocusComponent = (
      <>
        <el-input
          v-model={isFocusedStr.value}
          style={{ width: '180px' }}
          ref={focusNode}
        />
        <el-button
          style={{ marginLeft: '10px' }}
          onclick={() => focus()}
          type="primary">
          focus
        </el-button>
        <el-button style={{ marginLeft: '10px' }} onclick={() => blur()}>
          blur
        </el-button>
      </>
    );

    return () => (
      <>
        <h1>{title.value}</h1>

        {CountComponent}

        <el-divider>{dataStr.value}</el-divider>

        {RequestComponent}

        <el-divider>{dataStr.value}</el-divider>

        {FocusComponent}
      </>
    );
  },
});
