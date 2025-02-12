import type { RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";
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
        component: HomeView,
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
