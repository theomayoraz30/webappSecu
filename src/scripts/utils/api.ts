/* IMPORTS */

// --Modules--
import axios from 'axios';

// --Locals--
import { getToken } from '@/scripts/utils/auth';
import { API_BASE_URL, REQUEST_AUTH_TOKEN_NAME } from '@/scripts/utils/constants';

// Routes
const ROUTE_USERS = '/users';

/**
 * Liste des routes de l'API
 */
export const API_ROUTES = {
    USERS: {
        name: 'users',
        route: ROUTE_USERS,
    },
};

// Requête par défaut vers l'API
export const API_REQUEST = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
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
