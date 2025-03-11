<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { API_REQUEST, API_ROUTES } from '@/scripts/utils/api';
import { MESSAGES_ERROR, MESSAGES_TEXT } from '@/scripts/utils/messages';
import { useAuthStore } from '@/scripts/stores/authStore';
import { type ApiUser } from '@/scripts/interfaces/api';
import BigLoader from '@/components/global/BigLoader.vue';

// Statut du résultat de la requête
enum RequestStatus {
    DEFAULT = 0,
    SUCCESS = 1,
    ERROR = 2,
};

// Variables réactives
const user = ref<ApiUser | null | undefined>(undefined);
const isWaiting = ref<boolean>(false);

// Stores
const authStore = useAuthStore();

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


function showDefaultAlert() {
    alert.value = { status: RequestStatus.DEFAULT, message: '' };
};
function showSuccessAlert(message: string) {
    alert.value = { status: RequestStatus.SUCCESS, message: message };
};
function showErrorAlert(message: string) {
    alert.value = { status: RequestStatus.ERROR, message: message };
};

// Fonction pour mettre à jour le mot de passe
const changePassword = async () => {
    // Attente
    if (isWaiting.value) return;
    isWaiting.value = true;
    showDefaultAlert();

    // Si les mots de passent ne sont pas les mêmes
    if (form.value.new !== form.value.confirm) {
        isWaiting.value = false;
        return showErrorAlert("Les mots de passe ne correspondent pas.");
    }

    try {
        // Change le mot de passe
        const { data } = await API_REQUEST.post(API_ROUTES.AUTH.ME.PASSWORD.path, {
            oldPassword: form.value.current,
            newPassword: form.value.new,
        });

        // Affichage du succès
        const message = data.message || MESSAGES_TEXT.PASSWORD_CHANGED;
        showSuccessAlert(message);
    } catch (error: any) {
        // Affichage de l'erreur
        const message = error.response?.data?.message || MESSAGES_ERROR.API_DEFAULT;
        showErrorAlert(message);
    } finally {
        isWaiting.value = false;
    }
};

onMounted(() => {
    setTimeout(async() => {
        user.value = await authStore.retrieveUser()
    }, 500);
});
</script>

<template>
    <BigLoader v-if="user === undefined" />

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
