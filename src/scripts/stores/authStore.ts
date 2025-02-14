import { ref } from 'vue';
import { defineStore } from 'pinia';

import { type ApiUser } from '@/scripts/interfaces/api';
import { getCurrentUser } from '@/scripts/utils/api';

export const useAuthStore = defineStore('auth', () => {
    const isLoading = ref<boolean>(false);
    const currentUser = ref<ApiUser | null>(null);

    // Fonction pour vérifier la connexion
    async function retrieveUser() {
        isLoading.value = true;

        const user: ApiUser | null = await getCurrentUser();
        currentUser.value = user;

        isLoading.value = false;
    };

    function isLoggedIn(): boolean {
        return currentUser.value !== null;
    };

    return {
        isLoading,
        currentUser,
        retrieveUser,
        isLoggedIn,
    };
});
