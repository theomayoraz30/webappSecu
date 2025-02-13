/* IMPORTS */

// --Local--
import { getCookie, setCookie } from "@/scripts/utils/cookies";
import { COOKIE_AUTH_TOKEN_NAME } from "@/scripts/utils/constants";

/**
 * On récupére la valeur du bearer token
 * @returns
 */
export function getToken(): string | undefined {
    return getCookie(COOKIE_AUTH_TOKEN_NAME);
}

/**
 * On change la valeur du bearer token
 */
export function setToken(token: string) {
    // On mets le token dans les cookies
    setCookie(COOKIE_AUTH_TOKEN_NAME, token);
}

//export function
