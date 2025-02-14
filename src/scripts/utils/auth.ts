// --Local--
import { getValue, setValue } from "@/scripts/utils/storage";
import { COOKIE_AUTH_TOKEN_NAME } from "@/scripts/utils/constants";

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
