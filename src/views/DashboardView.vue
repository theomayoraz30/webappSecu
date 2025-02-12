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
      <slot></slot>
    </main>

    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
</style>
