/**
 * Récupére la valeur
 */
export function getValue(name: string): string | null {
    return sessionStorage.getItem(name);
}

/**
 * Change la valeur d'un cookie
 */
export function setValue(name: string, value: string) {
    sessionStorage.setItem(name, value);
}

/**
 * Enlève la valeur d'un cookie
 */
export function removeValue(name: string) {
    sessionStorage.removeItem(name);
}
