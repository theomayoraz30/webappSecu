<script lang="ts" setup>
import router from '@/router';
import { API_REQUEST, API_ROUTES } from '@/scripts/utils/api'
import { setToken } from '@/scripts/utils/auth'
import { MESSAGES_ERROR, MESSAGES_TEXT } from '@/scripts/utils/messages';
import { WEB_ROUTES } from '@/scripts/utils/routes';
import { ref } from 'vue'

/**
 * Status du résultat de la requête
 */
enum RequestStatus {
    DEFAULT = 0,
    SUCCESS = 1,
    ERROR = 2,
};

const form = ref({
    username: '',
    password: '',
});

const alert = ref({
    status: RequestStatus.DEFAULT,
    message: '',
});

const waiting = ref(false);

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

function login() {
    if (waiting.value) return;
    waiting.value = true;

    showDefaultAlert();

    const params = {
        username: form.value.username,
        password: form.value.password,
    };

    function send() {
        API_REQUEST.post(API_ROUTES.LOGIN.route, params)
            .then((response) => {
                // Check si il manque des données
                const token = response.data?.data?.token ?? null;
                if (token == null) return showErrorAlert(MESSAGES_ERROR.API_DEFAULT);

                // Enregistre le token dans les cookies
                setToken(token);

                // Affichage le succès
                showSuccessAlert(MESSAGES_TEXT.SUCCESS_CONNECTED);

                // Redirection vers la page 'home'
                router.push({ path: WEB_ROUTES.HOME.path });
            })
            .catch((error) => {
                console.log(error.response);
                // Récupére le message d'erreur sinon on prends celui par défaut
                const message = error.response?.data?.message || MESSAGES_ERROR.API_DEFAULT;

                // Affichage de l'erreur
                showErrorAlert(message);
            })
            .finally(() => {
                waiting.value = false;
            });
    }

    setTimeout(send, 1500);
}
</script>

<template>
    <section class="d-flex min-vh-100 position-relative" style="overflow-x: hidden">
        <!-- Top Right Link -->
        <p class="position-absolute top-0 end-0 mt-3 me-4 text-muted">
            Don't have an account ?
            <a href="#" class="text-decoration-none signup-link">Sign up</a>
        </p>

        <!-- Left Side (Illustration) -->
        <div class="col-lg-6 d-none d-md-flex align-items-center justify-content-center col-illustration">
            <img src="@/assets/img/illustration_login.png" alt="Illustration" class="img-fluid" />
        </div>


        <!-- Right Side (Login Form) -->
        <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center flex-column gap-3">
            <div class="signin-container">
                <h2 class="text-left mb-4">Sign in</h2>

                <div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class="bx bx-user"></i></span>
                        <input type="text" name="username" class="form-control" placeholder="username"
                            v-model="form.username" required />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class="bx bxs-lock-alt"></i></span>
                        <input type="password" name="password" class="form-control" placeholder="password"
                            v-model="form.password" required />
                    </div>
                    <button @click="login" id="login-btn" class="btn btn-primary w-100 btn-lg" :class="(waiting) ? 'loading' : null">
                        <span>Connexion</span>
                    </button>
                </div>
            </div>

            <div class="signin-container">
                <div v-if="alert.status === RequestStatus.SUCCESS" class="alert alert-success d-flex align-items-center" role="alert">
                    <i class='bx bx-check bi bi-exclamation-triangle-fill flex-shrink-0 mx-2'></i>
                    <div>
                        {{ alert.message }}
                    </div>
                </div>

                <div v-if="alert.status === RequestStatus.ERROR" class="alert alert-danger d-flex align-items-center" role="alert">
                    <i class='bx bx-error bi bi-exclamation-triangle-fill flex-shrink-0 mx-2'></i>
                    <div>
                        {{ alert.message }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.signin-container {
    width: 100%;
    max-width: 400px;
}

.col-illustration {
    background-color: #f1f0ea;
    border-radius: 30px 30px 30px 30px;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
}

span.input-group-text {
    background: #f1f0ea;
    border-right: none;
    border-radius: 2rem;
}

input.form-control {
    background-color: #f1f0ea !important;
    border-left: none;
    box-shadow: none !important;
    outline: none !important;
    border-radius: 2rem;
    font-size: 15px;

    &:focus,
    &:hover,
    &:active,
    &:focus-visible {
        background-color: #f1f0ea !important;
        box-shadow: none !important;
        outline: none !important;
    }
}

.signup-link {
    color: #212529;
    font-weight: 600;

    &:hover {
        color: #cf9ef5;
        transition: 0.2s ease-in-out;
    }
}

#login-btn {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 2rem;
    font-size: 15px;
    background-color: #cf9ef5;
    border-color: #cf9ef5;

    &:hover,
    &:active,
    &:focus,
    &:focus-visible {
        background-color: #9c76b9 !important;
        border-color: #9c76b9 !important;
    }

    &.loading {
        > span {
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
            to { transform: rotateZ(360deg); }
        }
    }

    &:not(.loading)::after {
        display: none;
    }
}
</style>
