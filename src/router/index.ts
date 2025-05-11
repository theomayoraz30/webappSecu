import { createRouter, createWebHistory } from 'vue-router';

import { WEB_ROUTES } from '@/scripts/utils/routes';
import { WEB_ROUTES_NAMES } from '@/scripts/utils/routes';

import { useAuthStore } from '@/scripts/stores/authStore';

const router = createRouter({
    history: createWebHistory(),
    routes: WEB_ROUTES,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    if(to.meta.requiresAuth) {
        await authStore.retrieveUser();
        if(!authStore.isLoggedIn) return next({ name: WEB_ROUTES_NAMES.LOGIN });
    }

    next();
});

export default router;
