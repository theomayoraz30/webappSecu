import type { RouteRecordRaw } from "vue-router";

import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import AdminView from "@/views/AdminView.vue";

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
    PROFILE: {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
    },
    ADMIN: {
        path: '/admin',
        name: 'admin',
        component: AdminView,
    },
};
