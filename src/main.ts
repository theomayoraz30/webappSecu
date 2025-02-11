import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Autres
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@/assets/css/main.css';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
