<script lang="tsx">
import { ref, defineComponent, toRefs, PropType } from 'vue';
import { ElButton } from 'element-plus';
import { useApi } from '@/hooks';
import { example, ExampleParams, ExampleReturn } from '@/services/api/example';
export default defineComponent({
  components: {
    ElButton,
  },
  props: {
    msg: {
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
    const { params, msg } = toRefs(props);
    let count = ref(0);
    let { loading, data, reactiveParams } = useApi<
      ExampleParams,
      ExampleReturn
    >({
      api: example,
      params,
      msg: {
        errorMsg: '失败',
      },
    });
    return () => (
      <>
        <h1>{msg}</h1>
        <el-button onclick={() => count.value++}>
          count is: {count.value}
        </el-button>
        <el-button onclick={() => (loading.value = true)}>
          {`loading: ${loading.value}`}
        </el-button>
      </>
    );
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
