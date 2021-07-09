import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
];

export default routes;
