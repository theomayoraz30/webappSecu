/* IMPORTS */

// --Modules--
import axios from 'axios';

// --Locals--
import { getToken } from '@/scripts/utils/auth';
import { API_BASE_URL, REQUEST_AUTH_TOKEN_NAME } from '@/scripts/utils/constants';
import type { ApiUser } from '../interfaces/api';

/**
 * Liste des routes de l'API
 */
export const API_ROUTES = {
    AUTH: {
        LOGIN: {
            name: 'auth.login',
            route: '/auth/login',
        },
        LOGOUT: {
            name: 'auth.logout',
            route: '/auth/logout',
        },
        ME: {
            name: 'auth.me',
            path: '/auth/me',

            PASSWORD: {
                name: 'auth.me.password',
                path: '/auth/me/password',
            }
        }
    },
    USERS: {
        name: 'users',
        route: '/users',
    },
};

// Requête par défaut vers l'API
export const API_REQUEST = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

/**
 * Authentification
 */
API_REQUEST.interceptors.request.use(
    (config) => {
        // Essaye de récupérer le token
        const token = getToken();

        // Si un token est enregistré, l'ajoute dans les headers
        if (token) config.headers[REQUEST_AUTH_TOKEN_NAME] = token;

        // Défaut
        return config;
    },
    (error) => Promise.reject(error),
);

/**
 * Récupére l'utilisateur actuel
 */
export async function getCurrentUser(): Promise<ApiUser | null> {
    try {
        const response = await API_REQUEST.get<ApiUser>(API_ROUTES.AUTH.ME.path);
        return response.data;
    } catch {
        return null;
    }
}
