import type { RouteRecordRaw } from "vue-router";

import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';

/**
 * Liste des routes du programme
 */
export const WEB_ROUTES: Record<string, RouteRecordRaw> = {
    HOME: {
        path: '/',
        name: 'home',
        redirect: '/login',
    },
    LOGIN: {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    DASHBOARD: {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
    },
};
