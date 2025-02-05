/**
 * Liste des différents routes du projet
 */
export enum Routes {
    HOME,
    LOGIN,
    DASHBOARD,
}

/**
 * Liste des routes du programme
 */
export const ROUTES: Record<Routes, { path: string, name: string }> = {
    [Routes.HOME]: {
        path: '/',
        name: 'home',
    },
    [Routes.LOGIN]: {
        path: '/login',
        name: 'login',
    },
    [Routes.DASHBOARD]: {
        path: '/dashboard',
        name: 'dashboard',
    },
};
