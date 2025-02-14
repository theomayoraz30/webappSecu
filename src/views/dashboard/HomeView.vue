<script lang="ts" setup>
import { WEB_ROUTES_NAMES } from '@/scripts/utils/routes';

import { useAuthStore } from '@/scripts/stores/authStore';
const authStore = useAuthStore();
</script>

<template>
  <div class="d-flex">
    <!-- Section Profile -->
    <div class="card">
      <div class="card-header">
        Profil
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">Votre profil</h5>
        <div class="d-flex flex-column justify-content-between flex-1">
          <p class="card-text">Accédez à votre profil pour modifier vos informations personnelles.</p>
          <router-link :to="{ name: WEB_ROUTES_NAMES.DASHBOARD.PROFILE }" class="btn btn-primary">Voir</router-link>
        </div>
      </div>
    </div>

    <!-- Section Users -->
    <div v-if="authStore.currentUser?.role === 'Admin'" class="card">
      <div class="card-header">
        Utilisateurs
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">Gestion des utilisateurs</h5>
        <div class="d-flex flex-column justify-content-between flex-1">
          <p class="card-text">Accédez à la liste des utilisateurs pour gérer leurs informations.</p>
          <router-link :to="{ name: WEB_ROUTES_NAMES.DASHBOARD.USERS }" class="btn btn-primary">Voir</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
    max-width: 300px;
    margin: 10px;
}
</style>
