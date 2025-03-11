<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { API_REQUEST, API_ROUTES } from '@/scripts/utils/api';

import BigLoader from '@/components/global/BigLoader.vue';

// Typage des données
interface User {
    id: number;
    username: string;
    role: string;
}

// Variables réactives
const users = ref<User[] | null>(null);
const isLoading = ref<boolean>(true);
const error = ref<boolean>(false);

// Fonction pour récupérer les utilisateurs
const fetchUsers = async () => {
    try {
        const response = await API_REQUEST.get<User[]>(API_ROUTES.USERS.route);
        users.value = response.data;
    } catch {
        error.value = true;
    } finally {
        isLoading.value = false;
    }
};

// Appel de la fonction fetchUsers lors du montage du composant
onMounted(() => setTimeout(fetchUsers, 500));
</script>

<template>
    <BigLoader v-if="isLoading" />

    <div v-else-if="users !== null" class="container mt-4">
        <h2>Liste des utilisateurs</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.role }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-else>
        <p>Erreur</p>
    </div>
</template>
