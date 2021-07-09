<template>
  <h1>{{ msg }}</h1>
  <el-button @click="count++"> count is: {{ count }} </el-button>
  <el-button @click="loading = true"> loading: {{ loading }} </el-button>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { useApi } from '@/hooks';
import { example, ExampleParams, ExampleReturn } from '@/services/api/example';
export default defineComponent({
  components: {
    ElButton,
  },
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);
    const { loading, data, reactiveParams } = useApi<
      ExampleParams,
      ExampleReturn
    >(example, {
      p1: '',
      p2: 123,
    });
    return { count, loading, data, reactiveParams };
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
