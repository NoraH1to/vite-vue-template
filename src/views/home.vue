<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld :title="title" :params="params" />
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      title: import.meta.env.VITE_TITLE,
      params: {
        hello: 'hello',
        world: 'world',
      },
    };
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
