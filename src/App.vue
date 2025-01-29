<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue'; // Assure-toi que ce fichier existe

</script>

<template>
  <div class="app-container">
    <header>
      <Navbar />
    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style></style>
