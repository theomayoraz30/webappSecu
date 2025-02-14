import { ref } from 'vue';
import { defineStore } from 'pinia';

import { checkAuth } from '@/scripts/utils/auth';

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false);
    const isLoading = ref(false);

    // Fonction pour vérifier la connexion
    const checkLoginStatus = async () => {
        isLoading.value = true;
        try {
            const result = await checkAuth();
            isLoggedIn.value = result;
        } catch {
            isLoggedIn.value = false;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoggedIn,
        isLoading,
        checkLoginStatus,
    };
});
