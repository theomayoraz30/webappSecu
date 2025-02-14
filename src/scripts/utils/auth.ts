/* IMPORTS */

// --Local--
import { getValue, setValue } from "@/scripts/utils/storage";
import { COOKIE_AUTH_TOKEN_NAME } from "@/scripts/utils/constants";
import { API_REQUEST, API_ROUTES } from "./api";

/**
 * Récupére la valeur du token dans le storage
 * @returns
 */
export function getToken(): string | null {
    return getValue(COOKIE_AUTH_TOKEN_NAME);
}

/**
 * Change la valeur du token dans le storage
 */
export function setToken(token: string) {
    // On mets le token dans les cookies
    setValue(COOKIE_AUTH_TOKEN_NAME, token);
}

/**
 * Check si l'utilisateur est authentifié
 */
export async function checkAuth(): Promise<boolean> {
    return new Promise(async (resolve) => {
        try {
            const response = await API_REQUEST.get(API_ROUTES.AUTH.ME.path);

            setTimeout(() => {
                resolve (response.status === 200);
            }, 1000);
        } catch {
            resolve(false);
        }
    });
}
