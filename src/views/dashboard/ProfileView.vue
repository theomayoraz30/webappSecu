<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { API_REQUEST, API_ROUTES } from '@/scripts/utils/api';

import BigLoader from '@/components/global/BigLoader.vue';
import { MESSAGES_ERROR, MESSAGES_TEXT } from '@/scripts/utils/messages';

// Statut du résultat de la requête
enum RequestStatus {
    DEFAULT = 0,
    SUCCESS = 1,
    ERROR = 2,
};

// Typage des données
interface User {
    id: number;
    username: string;
    role: string;
}

// Variables réactives
const user = ref<User | null>(null);
const isLoading = ref<boolean>(true);
const isWaiting = ref<boolean>(false);

// Form
const form = ref({
    current: '',
    new: '',
    confirm: '',
});

// Alert
const alert = ref({
    status: RequestStatus.DEFAULT,
    message: '',
});

/**
 * Affiche défaut
 */
function showDefaultAlert() {
    alert.value = {
        status: RequestStatus.DEFAULT,
        message: '',
    };
};

/**
 * Affiche succès
 */
function showSuccessAlert(message: string) {
    alert.value = {
        status: RequestStatus.SUCCESS,
        message: message,
    };
};

/**
 * Affiche erreur
 */
function showErrorAlert(message: string) {
    alert.value = {
        status: RequestStatus.ERROR,
        message: message,
    };
};

// Fonction pour récupérer les utilisateurs
const fetchUser = async () => {
    try {
        const response = await API_REQUEST.get<User>(API_ROUTES.AUTH.ME.path);
        user.value = response.data;
    } catch {

    } finally {
        isLoading.value = false;
    }
};

// Fonction pour mettre à jour le mot de passe
const changePassword = () => {
    // Attente
    if (isWaiting.value) return;
    isWaiting.value = true;

    // Reset
    showDefaultAlert();

    // Si les mots de passent ne sont pas les mêmes
    if (form.value.new !== form.value.confirm) {
        // Animation
        isWaiting.value = false;

        // Message
        showErrorAlert("Les mots de passe ne correspondent pas.");
        return;
    }

    // Paramètres
    const params = {
        oldPassword: form.value.current,
        newPassword: form.value.new,
    };

    // Logique d'API pour changer le mot de passe
    API_REQUEST.post(API_ROUTES.AUTH.ME.PASSWORD.path, params)
        .then((response) => {
            // Récupére le message d'erreur sinon on prends celui par défaut
            const message = response.data.message || MESSAGES_TEXT.PASSWORD_CHANGED;

            // Affichage du succès
            showSuccessAlert(message);
        })
        .catch((error) => {
            // Récupére le message d'erreur sinon on prends celui par défaut
            const message = error.response.data.message || MESSAGES_ERROR.API_DEFAULT;

            // Affichage de l'erreur
            showErrorAlert(message);
        })
        .finally(() => {
            isWaiting.value = false;
        });
};

// Appel de la fonction fetchUser lors du montage du composant
onMounted(() => setTimeout(fetchUser, 250));
</script>

<template>
    <BigLoader v-if="isLoading" />

    <div v-else-if="user !== null" class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h3>Profil Utilisateur</h3>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="username" class="form-label">Nom d'utilisateur</label>
                    <input type="text" class="form-control" id="username" v-model="user.username" disabled />
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Rôle</label>
                    <input type="text" class="form-control" id="role" v-model="user.role" disabled />
                </div>

                <h4 class="mt-4">Changer le mot de passe</h4>
                <form @submit.prevent="changePassword">
                    <div class="mb-3">
                        <label for="currentPassword" class="form-label">Mot de passe actuel</label>
                        <input type="password" class="form-control" id="currentPassword" v-model="form.current"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="newPassword" class="form-label">Nouveau mot de passe</label>
                        <input type="password" class="form-control" id="newPassword" v-model="form.new" required />
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirmation du mot de passe</label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="form.confirm"
                            required />
                    </div>
                    <button type="submit" id="password-btn" class="btn btn-primary"
                        :class="(isWaiting) ? 'loading' : null">
                        <span>Mettre à jour</span>
                    </button>
                </form>

                <div>
                    <div v-if="alert.status === RequestStatus.SUCCESS"
                        class="alert alert-success d-flex align-items-center" role="alert">
                        <i class='bx bx-check bi bi-exclamation-triangle-fill flex-shrink-0 mx-2'></i>
                        <div>
                            {{ alert.message }}
                        </div>
                    </div>

                    <div v-if="alert.status === RequestStatus.ERROR"
                        class="alert alert-danger d-flex align-items-center" role="alert">
                        <i class='bx bx-error bi bi-exclamation-triangle-fill flex-shrink-0 mx-2'></i>
                        <div>
                            {{ alert.message }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <p>Erreur</p>
    </div>
</template>

<style lang="scss" scoped>
#password-btn {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &.loading {
        >span {
            visibility: hidden;
        }
    }

    &::after {
        position: absolute;
        content: "";

        height: 16px;
        width: 16px;

        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: white;

        animation: loading 1s infinite;

        @keyframes loading {
            to {
                transform: rotateZ(360deg);
            }
        }
    }

    &:not(.loading)::after {
        display: none;
    }
}

.alert {
    margin-top: 16px;
    margin-bottom: 0;
}
</style>
