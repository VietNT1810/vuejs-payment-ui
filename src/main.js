import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/main.scss';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(ElementPlus);
app.mount('#app');

// createApp(App).use(store).use(ElementPlus).mount('#app');
