import { ref, defineComponent, toRefs, PropType } from 'vue';
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
    let {
      loading,
      data,
      params: reactiveParams,
      msg,
    } = useApi<ExampleParams, ExampleReturn>({
      api: example,
      params: params.value,
      msg: {
        errorMsg: '失败',
      },
    });
    let focusNode = ref();
    const { focus, blur, isFocused } = useFocus({
      node: focusNode,
      focused: true,
    });
    return () => (
      <>
        <h1>{title.value}</h1>
        <el-input
          v-model={msg.value.errorMsg}
          style={{ width: '180px' }}
          placeholder="错误提示信息"
        />
        <el-button
          style={{ marginLeft: '10px' }}
          ref={focusNode}
          onclick={() => count.value++}>
          count is: {count.value}
        </el-button>
        <el-button
          onclick={() => (loading.value = true)}
          loading={loading.value}>
          {`loading: ${loading.value}`}
        </el-button>
        <el-divider />
        <el-input
          v-model={isFocused.value}
          style={{ width: '180px' }}
          ref={focusNode}
        />
        <el-button style={{ marginLeft: '10px' }} onclick={() => focus()} type="primary">
          focus
        </el-button>
        <el-button style={{ marginLeft: '10px' }} onclick={() => blur()}>
          blur
        </el-button>
      </>
    );
  },
});
