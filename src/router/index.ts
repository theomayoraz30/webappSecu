import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/scripts/stores/authStore';

import { WEB_ROUTES, WEB_ROUTES_NAMES } from '@/scripts/utils/routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_WEB_URL),
    routes: WEB_ROUTES,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if(to.meta.requiresAuth) {
        await authStore.checkLoginStatus();
        if(!authStore.isLoggedIn) return next({ name: WEB_ROUTES_NAMES.LOGIN });
    }

    next();
});

export default router;
