<script lang="ts" setup>
import Navbar from '@/components/NavbarComp.vue';
import Footer from '@/components/FooterComp.vue';
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
      <Footer></Footer>
    </footer>
  </div>
</template>
