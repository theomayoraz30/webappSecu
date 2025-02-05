/* IMPORTS */
import Cookies from "js-cookie";

/**
 * Récupére la valeur d'un cookie
 */
export function getCookie(name: string): string {
  return Cookies.get(name);
}

/**
 * Change la valeur d'un cookie
 */
export function setCookie(name: string, value: string, expires: number = 7, path: string = "/") {
  Cookies.set(name, value, { expires, path });
}

/**
 * Enlève la valeur d'un cookie
 */
export function removeCookie(name: string) {
  cookies.remove(name);
}
