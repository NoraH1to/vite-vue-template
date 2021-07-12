<template></template>

<script lang="tsx">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import logo from '@/assets/logo.png';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup: () => {
    const title = import.meta.env.VITE_TITLE;
    const params = {
      hello: 'hello',
      world: 'world',
    };
    return () => (
      <>
        <img alt="Vue logo" src={logo} />
        <HelloWorld msg={title} params={params} />
      </>
    );
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
