import { defineComponent, Ref, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld';
import { ElButton, ElInput } from 'element-plus';
import logo from '@/assets/logo.png';
import { Msg } from '@/hooks/useApi';

export default defineComponent({
  name: 'App',
  setup() {
    /**
     * 这样返回的是函数式组件
     */
    const slotComp = ({ msg }: { msg: Msg }) => {
      return <ElInput style={{ width: '180px' }} v-model={msg.successMsg} />;
    };

    /**
     * 函数式组件 +1
     */
    const propComp = ({ msg }: { msg: Msg }) => {
      return <ElInput style={{ width: '180px' }} v-model={msg.errorMsg} />;
    };

    const title = import.meta.env.VITE_TITLE;
    const params = {
      hello: 'hello',
      world: 'world',
    };
    return () => (
      <>
        <img alt="Vue logo" src={logo} />
        <HelloWorld title={title} params={params} propComp={propComp}>
          {slotComp}
        </HelloWorld>
      </>
    );
  },
});
