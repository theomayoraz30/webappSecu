/**
 * Récupére la valeur
 */
export function getValue(name: string): string | null {
    return localStorage.getItem(name);
}

/**
 * Change la valeur d'un cookie
 */
export function setValue(name: string, value: string) {
    localStorage.setItem(name, value);
}

/**
 * Enlève la valeur d'un cookie
 */
export function removeValue(name: string) {
    localStorage.removeItem(name);
}
