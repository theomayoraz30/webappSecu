import { createRouter, createWebHistory } from 'vue-router'
import { WEB_ROUTES } from '@/scripts/utils/routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_WEB_URL),
    routes: Object.values(WEB_ROUTES),
});

export default router;
