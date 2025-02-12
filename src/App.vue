<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
/* S'assure que la page prend toute la hauteur de l'écran */
.app-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

/* Permet au contenu de grandir et pousse le footer vers le bas */
.content {
  flex: 1;
}
</style>
