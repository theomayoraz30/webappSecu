<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/scripts/stores/authStore';

import BigLoader from '@/components/global/BigLoader.vue';

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.isLoading" class="loader">
    <!-- Affiche le loader pendant que l'authentification est en cours -->
    <BigLoader />
  </div>

  <!-- Pages de l'application -->
  <router-view v-else />
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
