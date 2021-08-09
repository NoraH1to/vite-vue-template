import { createApp } from 'vue';
import App from './App.vue';
import Router from '@/routes';
import '@/mock';

const app = createApp(App);

app.use(Router);
app.mount('#app');
