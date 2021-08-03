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
     * defineComponent 传入一个函数时，该函数其实是一个 setup 函数
     * 这样定义的时候没有指定 props，所以只能从 attrs 中取传参，没有类型提示
     */
    const propComp = defineComponent((_, { attrs }) => {
      return () => (
        <ElInput style={{ width: '180px' }} v-model={attrs?.msg?.errorMsg} />
      );
    });

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
