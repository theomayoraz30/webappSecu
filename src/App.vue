<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/scripts/stores/authStore';

import GlobalLoader from '@/components/global/GlobalLoader.vue';

const authStore = useAuthStore();
</script>

<template>
  <!-- Affiche le loader pendant que l'authentification est en cours -->
  <GlobalLoader v-if="authStore.isLoading" />

  <!-- Pages de l'application -->
  <router-view v-else />
</template>
