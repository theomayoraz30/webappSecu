<script setup lang="ts">
import Navbar from '../components/NavbarComp.vue';
import Footer from '../components/FooterComp.vue'; // Assure-toi que ce fichier existe
</script>

<template>
  <div class="app-container">
    <header>
      <Navbar />
    </header>

    <main class="content">
      <h1>Dashboard</h1>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>
