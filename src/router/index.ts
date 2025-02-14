import { createRouter, createWebHistory } from 'vue-router';

import { WEB_ROUTES } from '@/scripts/utils/routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_WEB_URL),
    routes: WEB_ROUTES,
});

/*
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if(to.meta.requiresAuth) {
        await authStore.checkLoginStatus();
        if(!authStore.isLoggedIn) return next({ name: WEB_ROUTES_NAMES.LOGIN });
    }

    next();
});*/

export default router;
