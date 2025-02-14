import type { RouteRecordRaw } from "vue-router";

import { useAuthStore } from '@/scripts/stores/authStore';

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardHomeView from "@/views/dashboard/HomeView.vue";
import DashboardProfileView from "@/views/dashboard/ProfileView.vue";
import DashboardUsersView from "@/views/dashboard/UsersView.vue";


/**
 * Liste des noms des routes du programme
 */
export const WEB_ROUTES_NAMES = {
    HOME: 'home',
    LOGIN: 'login',
    DASHBOARD: {
        HOME: 'dashboard.home',
        PROFILE: 'dashboard.profile',
        USERS: 'dashboard.users',
    }
}


/**
 * Liste des routes du programme
 */
export const WEB_ROUTES: RouteRecordRaw[] = [
    {
        path: '/',
        name: WEB_ROUTES_NAMES.HOME,
        component: HomeView,
    },
    {
        path: '/login',
        name: WEB_ROUTES_NAMES.LOGIN,
        component: LoginView,
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        beforeEnter: async (to, from, next) => {
            const authStore = useAuthStore();
            await authStore.retrieveUser();

            if(!authStore.isLoggedIn) return next({ name: WEB_ROUTES_NAMES.LOGIN });

            next();
        },
        meta: {
            requiresAuth: true,
        },
        redirect: {
            name: WEB_ROUTES_NAMES.DASHBOARD.HOME,
        },
        children: [
            {
                path: 'home',
                name: WEB_ROUTES_NAMES.DASHBOARD.HOME,
                component: DashboardHomeView,
            },
            {
                path: 'profile',
                name: WEB_ROUTES_NAMES.DASHBOARD.PROFILE,
                component: DashboardProfileView,
            },
            {
                path: 'users',
                name: WEB_ROUTES_NAMES.DASHBOARD.USERS,
                component: DashboardUsersView,
            },
        ]
    }
];
