import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Externes
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'boxicons/css/boxicons.min.css';

// Personnalisé
import '@/assets/scss/_global.scss';

import App from '@/App.vue';
import router from '@/router';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
