<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <!-- Pages de l'application -->
  <router-view />
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
