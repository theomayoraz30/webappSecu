import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { WEB_ROUTES } from '@/scripts/utils/routes'
import type { RouteWithChildren } from '@/scripts/types/routes';

function transformRoutes(
    routes: RouteWithChildren,
): RouteRecordRaw[] {
    return Object.values(routes).map(route => {
        if (!route.routes) return route;

        return {
            ...route,
            children: transformRoutes(route.routes),
        };
    });
}

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_WEB_URL),
    routes: transformRoutes(WEB_ROUTES),
});

export default router;
