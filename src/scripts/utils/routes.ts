import type { RouteWithChildren } from "@/scripts/types/routes";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

import DashboardHomeView from "@/views/dashboard/HomeView.vue";
import DashboardProfileView from "@/views/dashboard/ProfileView.vue";
import DashboardUsersView from "@/views/dashboard/UsersView.vue";


/**
 * Liste des routes du programme
 */
export const WEB_ROUTES: RouteWithChildren = {
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
    DASHBOARD: {
        path: '/dashboard',
        name: 'dashboard',
        routes: {
            HOME: {
                path: 'home',
                name: 'dashboard.home',
                component: DashboardHomeView,
            },
            PROFILE: {
                path: 'profile',
                name: 'dashboard.profile',
                component: DashboardProfileView,
            },
            ADMIN: {
                path: 'users',
                name: 'dashboard.users',
                component: DashboardUsersView,
            },
        }
    }
};
