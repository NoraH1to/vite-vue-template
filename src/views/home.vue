<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld :msg="title" :params="params" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      title: import.meta.env.VITE_TITLE,
      params: {
        p1: 'p1',
        p2: 2,
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
